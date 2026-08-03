import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { CheckSaved, GetSavedVideos, SaveVideo, UnsaveVideo } from "../controllers/Save/saveVideo.js";


const router = Router();

router.use(requireAuth);

router.post("/save", SaveVideo);

router.delete("/saved/:videoId", UnsaveVideo);
router.get("/saved/:videoId/check", CheckSaved);
router.get("/saved", GetSavedVideos);


export default router;

