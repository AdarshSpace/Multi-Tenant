import type { Request, Response } from "express";
import { prisma } from "../../lib/DB.js";

type VideoRecord = {
  id: string;
  title: string;
  description: string | null;
  duration: number | null;
  position: number;
  isPreview: boolean;
  notesUrl: string | null;
  aiProcessingStatus: string;
  quiz: unknown;
  assignment: unknown;
};

function sanitizeVideo(video: VideoRecord, hasPurchased: boolean) {
  const canPlay = video.isPreview || hasPurchased;

  return {
    id: video.id,
    title: video.title,
    description: video.description,
    duration: video.duration,
    position: video.position,
    isPreview: video.isPreview,
    isLocked: !canPlay,
    canPlay,
    notesUrl: canPlay ? video.notesUrl : null,
    aiProcessingStatus: video.aiProcessingStatus,
    quiz: canPlay ? video.quiz : null,
    assignment: canPlay ? video.assignment : null,
  };
}

export const getCurriculum = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const { courseId } = req.params as { courseId: string };

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const curriculum = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        price: true,
        oldPrice: true,
        rating: true,
        students: true,
        lessons: true,
        category: true,
        modules: {
          orderBy: { position: "asc" },
          select: {
            id: true,
            title: true,
            position: true,
            videos: {
              orderBy: { position: "asc" },
              select: {
                id: true,
                title: true,
                description: true,
                duration: true,
                position: true,
                isPreview: true,
                notesUrl: true,
                aiProcessingStatus: true,
                quiz: true,
                assignment: true,
              },
            },
          },
        },
      },
    });

    if (!curriculum) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
      select: { paid: true },
    });

    const hasPurchased = purchase?.paid === true;

    const sanitized = {
      ...curriculum,
      hasPurchased,
      modules: curriculum.modules.map((module) => ({
        id: module.id,
        title: module.title,
        position: module.position,
        videos: module.videos.map((video) => sanitizeVideo(video, hasPurchased)),
      })),
    };

    return res.status(200).json({ success: true, data: sanitized });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch curriculum" });
  }
};
