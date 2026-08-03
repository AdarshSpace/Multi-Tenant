import { Router } from "express";
import { resolveTenant } from "../middleware/tenant.js";
import { requireAuth } from "../middleware/auth.js";
import { register, login, refresh, logout, me, googleStart, googleCallback, githubStart, githubCallback, exchangeHandoff, } from "../controllers/auth/auth.js";

const router = Router();

// email + password (need to know which tenant this request is for)
router.post("/register", resolveTenant, register);
router.post("/login", resolveTenant, login);

// refresh/logout don't need tenant resolution - the session row already knows the user
router.post("/refresh", refresh);
router.post("/logout", logout);

// requires a valid access token
router.get("/me", requireAuth, me);

// OAuth (redirect-based, no CORS involved for these two)
router.get("/google", googleStart);
router.get("/google/callback", googleCallback);
router.get("/github", githubStart);
router.get("/github/callback", githubCallback);

// called by the frontend's /auth/callback page right after an OAuth redirect
router.post("/exchange", exchangeHandoff);

export default router;