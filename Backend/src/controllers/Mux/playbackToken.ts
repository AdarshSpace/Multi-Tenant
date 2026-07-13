import type { Request, Response } from "express";
import { mux } from "../../lib/mux.js";
import { prisma } from "../../lib/DB.js";

function buildJwtParams(userId: string): Record<string, string> {
  const params: Record<string, string> = { sub: userId };

  const isProd = process.env.NODE_ENV === "production";
  const restrictionId = isProd
    ? process.env.MUX_PLAYBACK_RESTRICTION_ID
    : process.env.MUX_PLAYBACK_RESTRICTION_ID_DEV ?? null;

  if (isProd && !restrictionId) {
    throw new Error("MUX_PLAYBACK_RESTRICTION_ID is required in production");
  }

  // In development, skip restriction unless a dev-specific ID is configured.
  // Production restrictions block localhost referrers and cause HLS 403 locally.
  if (restrictionId) {
    params.playback_restriction_id = restrictionId;
  }

  return params;
}

export const handleGetPlaybackToken = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { videoId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const video = await prisma.video.findUnique({
      where: { id: videoId as string },
      select: {
        id: true,
        muxPlaybackId: true,
        isPreview: true,
        module: {
          select: { courseId: true },
        },
      },
    });

    if (!video?.muxPlaybackId) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    const courseId = video.module.courseId;

    if (!video.isPreview) {
      const purchase = await prisma.purchase.findUnique({
        where: {
          userId_courseId: { userId, courseId },
        },
        select: { paid: true },
      });

      if (!purchase?.paid) {
        return res.status(403).json({ success: false, message: "Course not purchased" });
      }
    }

    const jwtParams = buildJwtParams(userId);

    // Signed playback requires tokens for both stream + thumbnail when thumbnailTime is set
    const tokens = await mux.jwt.signPlaybackId(video.muxPlaybackId, {
      expiration: "1h",
      type: ["video", "thumbnail"],
      params: jwtParams,
    });

    const playbackToken = tokens["playback-token"];
    const thumbnailToken = tokens["thumbnail-token"];

    if (!playbackToken) {
      throw new Error("Failed to generate playback token");
    }

    return res.status(200).json({
      success: true,
      playbackId: video.muxPlaybackId,
      playbackToken,
      thumbnailToken: thumbnailToken ?? playbackToken,
    });
  } catch (error) {
    console.error("Failed to generate playback token:", error);
    return res.status(500).json({ success: false, message: "Failed to generate playback token" });
  }
};
