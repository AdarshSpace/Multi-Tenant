import type { Request, Response, NextFunction } from "express";
import { extractHostFromOrigin, getTenantIdForDomain } from "../controllers/auth/TenantCache.js";

// dev-only: map fake local hostnames straight to a tenant id via env,
// so you don't need a real DNS-verified domain to test locally.
const DEV_HOST_OVERRIDES: Record<string, string | undefined> = {
  "tenant1.local:3000": process.env.DEV_TENANT_1_ID,
  "tenant2.local:3000": process.env.DEV_TENANT_2_ID,
};

// Use on every /api/auth/* route (and any tenant-scoped data route).
export async function resolveTenant(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin as string | undefined;

  if (process.env.NODE_ENV !== "production") {
    const devHost = origin?.replace(/^https?:\/\//, "");
    const devTenantId = devHost && DEV_HOST_OVERRIDES[devHost];
    if (devTenantId) {
      req.tenantId = devTenantId;
      return next();
    }
  }

  const host = extractHostFromOrigin(origin);
  if (!host) {
    return res.status(400).json({ error: "Missing or invalid Origin header" });
  }

  const tenantId = await getTenantIdForDomain(host);
  if (!tenantId) {
    return res.status(403).json({ error: "Unknown or inactive tenant domain" });
  }

  req.tenantId = tenantId;
  next();
}