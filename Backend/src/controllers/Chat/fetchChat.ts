import type { Request, Response } from "express";

import { prisma } from "../../lib/DB.js";


// getChatController.ts
export const getChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { videoId } = req.params as { courseId?: string; videoId?: string };

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: "Please provide videoId",
      });
    }

    const chat = await prisma.chatMessage.findUnique({
      where: { userId_videoId: { userId, videoId } },
    });

    return res.status(200).json({
      success: true,
      messages: chat?.content ?? [],
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};