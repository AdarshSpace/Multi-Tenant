import { prisma } from "../../lib/DB.js";
import { generateAssessment } from "../../worker/Quiz.js";
import type { Request, Response } from "express";

export async function generateAndStoreAssessment( videoId: string, pdfUrl: string) {
    try {
        if (!pdfUrl || !videoId) {
            throw new Error("PDF URL and video ID are required");
        }

        const assessment = await generateAssessment(pdfUrl);

       
        const res = await prisma.video.update({
             where: { id: videoId },
             data: { quiz: assessment.quiz, assignment: assessment.assignment },
         });

         return { success: true, data: res }

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const handleGenerateAssessment = async (req: Request, res: Response): Promise<any> => {
    try {
        if (req.user?.role !== "TEACHER") {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }

        const videoId = req.params.videoId as string;
        if (!videoId) {
            return res.status(400).json({ success: false, message: "Video ID is required" });
        }

        const video = await prisma.video.findUnique({
            where: { id: videoId },
        });

        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        if (!video.notesUrl) {
            return res.status(400).json({ success: false, message: "No PDF notes available for this lecture." });
        }

                // Safety check
        if (video.quiz || video.assignment) {
            return res.status(409).json({
                success: false,
                message: "Assessment already exists for this lecture.",
            });
        }

        await generateAndStoreAssessment(videoId, video.notesUrl);

        return res.status(200).json({ success: true, message: "Assessment generated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to generate assessment" });
    }
};