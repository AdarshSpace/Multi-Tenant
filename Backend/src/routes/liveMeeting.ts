import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getLiveClassToken, endLiveClass, createIndependentMeeting, getTenantLiveClasses } from "../controllers/LiveClass/LiveClass.js"

const router = Router();

// Apply authentication middleware to all routes below
router.use(requireAuth);

router.get("/classes", getTenantLiveClasses);
router.get("/class/:liveClassId/token", getLiveClassToken);
router.post("/class/:liveClassId/end", endLiveClass);
router.post("/independent/create", createIndependentMeeting);

export default router;