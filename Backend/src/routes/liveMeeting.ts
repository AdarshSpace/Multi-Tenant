import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getLiveClassToken, endLiveClass, createIndependentMeeting } from "../controllers/LiveClass/LiveClass.js"

const router = Router();

// Apply authentication middleware to all routes below
router.use(requireAuth);

router.get("/class/:liveClassId/token", getLiveClassToken);
//router.post("/class/create", createLiveClass);
router.post("/class/:liveClassId/end", endLiveClass);
router.post("/independent/create", createIndependentMeeting);


export default router;