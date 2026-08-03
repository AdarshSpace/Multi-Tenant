import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../../lib/DB.js"
import { signAccessToken, generateRefreshToken, hashToken, refreshTokenExpiryDate, generateHandoffCode, } from "../../lib/JWT.js";
import { getTenantIdForDomain, extractHostFromOrigin } from "./TenantCache.js";

const BCRYPT_ROUNDS = 12;
const HANDOFF_TTL_MS = 60 * 1000; // 60 seconds, single use

// ---------- helpers ----------

async function createSessionForUser(userId: string, tenantId: string, role: string) {
  const accessToken = signAccessToken({ userId, tenantId, role });
  const refreshToken = generateRefreshToken();

  await prisma.session.create({
    data: {
      userId,
      refreshTokenHash: hashToken(refreshToken),
      expiresAt: refreshTokenExpiryDate(),
    },
  });

  return { accessToken, refreshToken };
}

function publicUser(user: { id: string; name: string; email: string; role: string; image: string | null }) {
  return { id: user.id, name: user.name, email: user.email, role: user.role, image: user.image };
}

// ---------- email + password ----------

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(72), // bcrypt caps input at 72 bytes
});

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { name, email, password } = parsed.data;
  const tenantId = req.tenantId!; // set by resolveTenant middleware

  const existing = await prisma.user.findUnique({
    where: { tenantId_email: { tenantId, email } },
  });
  if (existing) {
    return res.status(409).json({ error: "An account with this email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const user = await prisma.user.create({
    data: { name, email, password: passwordHash, tenantId },
  });

  const { accessToken, refreshToken } = await createSessionForUser(user.id, tenantId, user.role);

  return res.status(201).json({ user: publicUser(user), accessToken, refreshToken });
}



const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { email, password } = parsed.data;
  const tenantId = req.tenantId!;

  const user = await prisma.user.findUnique({
    where: { tenantId_email: { tenantId, email } },
  });

  // NOTE: user.password is null for OAuth-only accounts
  if (!user || !user.password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const { accessToken, refreshToken } = await createSessionForUser(user.id, tenantId, user.role);

  return res.json({ user: publicUser(user), accessToken, refreshToken });
}

// ---------- refresh / logout ----------

const refreshSchema = z.object({ refreshToken: z.string().min(10) });

export async function refresh(req: Request, res: Response) {
  const parsed = refreshSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "refreshToken is required" });
  }
  const { refreshToken } = parsed.data;
  const hash = hashToken(refreshToken);

  const session = await prisma.session.findUnique({ where: { refreshTokenHash: hash } });
  if (!session || session.revoked || session.expiresAt < new Date()) {
    return res.status(401).json({ error: "Session expired, please log in again" });
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return res.status(401).json({ error: "User not found" });

  // rotate the refresh token: old one is revoked, a new one issued.
  // if a REVOKED token is ever presented again later, that's a strong signal
  // of token theft (v2: revoke all sessions for that user when this happens).
  await prisma.session.update({ where: { id: session.id }, data: { revoked: true } });

  const { accessToken, refreshToken: newRefreshToken } = await createSessionForUser(
    user.id,
    user.tenantId,
    user.role
  );

  return res.json({ accessToken, refreshToken: newRefreshToken });
}

export async function logout(req: Request, res: Response) {
  const parsed = refreshSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "refreshToken is required" });
  }
  const hash = hashToken(parsed.data.refreshToken);
  await prisma.session.updateMany({ where: { refreshTokenHash: hash }, data: { revoked: true } });
  return res.json({ success: true });
}

export async function me(req: Request, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json({ user: publicUser(user) });
}

// ---------- OAuth: Google ----------

export async function googleStart(req: Request, res: Response) {
  const frontendOrigin = req.query.origin as string | undefined;
  const host = extractHostFromOrigin(frontendOrigin);
  const tenantId = host ? await getTenantIdForDomain(host) : undefined;

  if (!frontendOrigin || !tenantId) {
    return res.status(400).json({ error: "Unknown tenant origin" });
  }

  const state = Buffer.from(JSON.stringify({ frontendOrigin })).toString("base64url");

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    redirect_uri: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}

export async function googleCallback(req: Request, res: Response) {
  try {
    const code = req.query.code as string;
    const state = JSON.parse(Buffer.from(req.query.state as string, "base64url").toString());
    const frontendOrigin = state.frontendOrigin as string;
    const host = extractHostFromOrigin(frontendOrigin);
    const tenantId = host ? await getTenantIdForDomain(host) : undefined;
    if (!tenantId) return res.status(400).send("Unknown tenant");

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        redirect_uri: `${process.env.BACKEND_URL}/api/auth/google/callback`,
        grant_type: "authorization_code",
        code,
      }),
    }).then((r) => r.json());

    const profile = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenRes.access_token}` },
    }).then((r) => r.json());
    // profile: { sub, email, name, picture, ... }

    const user = await findOrCreateOAuthUser({
      provider: "google",
      providerAccountId: profile.sub,
      email: profile.email,
      name: profile.name,
      image: profile.picture,
      tenantId,
    });

    await redirectWithHandoff(res, user, frontendOrigin);
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.status(500).send("Google login failed");
  }
}

// ---------- OAuth: GitHub ----------

export async function githubStart(req: Request, res: Response) {
  const frontendOrigin = req.query.origin as string | undefined;
  const host = extractHostFromOrigin(frontendOrigin);
  const tenantId = host ? await getTenantIdForDomain(host) : undefined;

  if (!frontendOrigin || !tenantId) {
    return res.status(400).json({ error: "Unknown tenant origin" });
  }

  const state = Buffer.from(JSON.stringify({ frontendOrigin })).toString("base64url");

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID as string,
    redirect_uri: `${process.env.BACKEND_URL}/api/auth/github/callback`,
    scope: "read:user user:email",
    state,
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}

export async function githubCallback(req: Request, res: Response) {
  try {
    const code = req.query.code as string;
    const state = JSON.parse(Buffer.from(req.query.state as string, "base64url").toString());
    const frontendOrigin = state.frontendOrigin as string;
    const host = extractHostFromOrigin(frontendOrigin);
    const tenantId = host ? await getTenantIdForDomain(host) : undefined;
    if (!tenantId) return res.status(400).send("Unknown tenant");

    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID as string,
        client_secret: process.env.GITHUB_CLIENT_SECRET as string,
        redirect_uri: `${process.env.BACKEND_URL}/api/auth/github/callback`,
        code,
      }),
    }).then((r) => r.json());

    const ghUser = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${tokenRes.access_token}` },
    }).then((r) => r.json());

    let email = ghUser.email as string | null;
    if (!email) {
      // private email -> fetch from the emails endpoint
      const emails = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${tokenRes.access_token}` },
      }).then((r) => r.json());
      email = emails.find((e: any) => e.primary)?.email ?? emails[0]?.email ?? null;
    }
    if (!email) return res.status(400).send("GitHub account has no accessible email");

    const user = await findOrCreateOAuthUser({
      provider: "github",
      providerAccountId: String(ghUser.id),
      email,
      name: ghUser.name ?? ghUser.login,
      image: ghUser.avatar_url,
      tenantId,
    });

    await redirectWithHandoff(res, user, frontendOrigin);
  } catch (err) {
    console.error("GitHub OAuth error:", err);
    res.status(500).send("GitHub login failed");
  }
}

// ---------- shared OAuth helpers ----------

async function findOrCreateOAuthUser(params: {
  provider: string;
  providerAccountId: string;
  email: string;
  name: string;
  image?: string;
  tenantId: string;
}) {
  const { provider, providerAccountId, email, name, image, tenantId } = params;

  const existingOAuth = await prisma.oAuthAccount.findUnique({
    where: { provider_providerAccountId: { provider, providerAccountId } },
    include: { user: true },
  });
  if (existingOAuth) return existingOAuth.user;

  // no OAuth link yet -> see if a user with this email already exists for this tenant
  // (e.g. they originally signed up with email+password) and link the accounts.
  let user = await prisma.user.findUnique({ where: { tenantId_email: { tenantId, email } } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name,
        email,
        image: image ?? null,
        tenantId,
        emailVerified: true,
      },
    });
  }

  await prisma.oAuthAccount.create({
    data: { provider, providerAccountId, userId: user.id },
  });

  return user;
}

async function redirectWithHandoff(res: Response, user: { id: string; tenantId: string; role: string }, frontendOrigin: string) {
  const { accessToken, refreshToken } = await createSessionForUser(user.id, user.tenantId, user.role);

  const handoffCode = generateHandoffCode();
  await prisma.oAuthHandoff.create({
    data: {
      code: handoffCode,
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + HANDOFF_TTL_MS),
    },
  });

  res.redirect(`${frontendOrigin}/auth/callback?code=${handoffCode}`);
}

// Frontend's /auth/callback page calls this immediately with the handoff code
// to get the real tokens. Single use, ~60s TTL.
const exchangeSchema = z.object({ code: z.string().min(10) });

export async function exchangeHandoff(req: Request, res: Response) {
  const parsed = exchangeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "code is required" });

  const record = await prisma.oAuthHandoff.findUnique({ where: { code: parsed.data.code } });
  if (!record || record.used || record.expiresAt < new Date()) {
    return res.status(400).json({ error: "Invalid or expired code" });
  }

  await prisma.oAuthHandoff.update({ where: { id: record.id }, data: { used: true } });

  return res.json({ accessToken: record.accessToken, refreshToken: record.refreshToken });
}