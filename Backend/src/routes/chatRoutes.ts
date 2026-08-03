import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { askAi } from "../controllers/Chat/chat.js";
import { getChat } from "../controllers/Chat/fetchChat.js";

const router = Router();

router.use(requireAuth);

router.post("/ask", askAi);
router.get("/fetch/:courseId/:videoId", getChat);


export default router;
