import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/JWT.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization; // "Bearer <token>"
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    return res.status(401).json({ error: "Missing access token" });
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = payload;

    next();
  } catch {
    // expired or invalid -> frontend should call /api/auth/refresh and retry
    return res.status(401).json({ error: "Invalid or expired access token" });
  }
}
