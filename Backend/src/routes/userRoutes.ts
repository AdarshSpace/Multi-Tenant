import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getUser } from "../controllers/User/getUser.js";

const router = Router();
router.use(requireAuth);


router.get("/me", getUser);



export default router;
