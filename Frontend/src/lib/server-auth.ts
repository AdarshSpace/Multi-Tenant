import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAMES } from "./tokens";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const ACCESS_MAX_AGE = 60 * 60 * 24 * 3; // 3 days
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;

async function persistTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  try {
    cookieStore.set(TOKEN_COOKIE_NAMES.access, accessToken, {
      path: "/",
      maxAge: ACCESS_MAX_AGE,
      sameSite: "lax",
    });
    cookieStore.set(TOKEN_COOKIE_NAMES.refresh, refreshToken, {
      path: "/",
      maxAge: REFRESH_MAX_AGE,
      sameSite: "lax",
    });
  } catch {
    // Cookie writes are only allowed in Server Actions / Route Handlers.
    // During RSC render we can still use the fresh token for this request.
  }
}

export async function getServerAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKEN_COOKIE_NAMES.access)?.value;
  if (accessToken) return accessToken;

  const refreshToken = cookieStore.get(TOKEN_COOKIE_NAMES.refresh)?.value;
  if (!refreshToken || !BACKEND_URL) return undefined;

  const res = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  if (!res.ok) {
    try {
      cookieStore.delete(TOKEN_COOKIE_NAMES.access);
      cookieStore.delete(TOKEN_COOKIE_NAMES.refresh);
    } catch {
      // ignore
    }
    return undefined;
  }

  const data = (await res.json()) as {
    accessToken: string;
    refreshToken: string;
  };

  await persistTokens(data.accessToken, data.refreshToken);
  return data.accessToken;
}

export async function authHeaders(
  extra?: HeadersInit
): Promise<Record<string, string>> {
  const accessToken = await getServerAccessToken();
  const headers: Record<string, string> = {};

  if (extra) {
    const entries =
      extra instanceof Headers
        ? [...extra.entries()]
        : Array.isArray(extra)
          ? extra
          : Object.entries(extra);
    for (const [key, value] of entries) {
      if (value !== undefined) headers[key] = String(value);
    }
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return Boolean(
    cookieStore.get(TOKEN_COOKIE_NAMES.access)?.value ||
      cookieStore.get(TOKEN_COOKIE_NAMES.refresh)?.value
  );
}
