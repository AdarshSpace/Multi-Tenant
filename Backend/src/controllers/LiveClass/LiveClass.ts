import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

// ASSUMPTION — adjust this import to match your actual project structure.
// This code assumes your auth middleware augments the global Express.Request
// type with `req.user: { id, role, tenantId }` (the standard pattern) rather
// than exporting a separate request type — a separate type here would break
// Express's RequestHandler overload resolution for router.get/post.
import { prisma } from "../../lib/DB.js";

import { createVideoSDKRoom, generateVideoSDKToken } from "../../lib/VideoSDK.js";

const createLiveClassSchema = z.object({
  courseId: z.string().min(1, "courseId is required"),
  lessonId: z.string().min(1).optional(),
});

const createIndependentMeetingSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  scheduledAt: z.string().optional(),
});

/**
 * POST /api/live-class/create
 * Teacher-only. Verifies the caller teaches the course, creates a VideoSDK room,
 * and persists a LiveMeeting row with status LIVE.
 */
// export async function createLiveClass(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const user = req.user;

//     if (user.role !== "TEACHER") {
//       res.status(403).json({ error: "Only teachers can start a live class" });
//       return;
//     }

//     const parsed = createLiveClassSchema.safeParse(req.body);
//     if (!parsed.success) {
//       res.status(400).json({ error: "Invalid request body", details: parsed.error.flatten() });
//       return;
//     }

//     const { courseId, lessonId } = parsed.data;

//     // Ownership check: this teacher must own this course (same pattern as course-ownership
//     // checks elsewhere — scoped to tenant as well, since this is a multi-tenant app)
//     const course = await prisma.course.findFirst({
//       where: {
//         id: courseId,
//         teacherId: user.id,
//         tenantId: user.tenantId,
//       },
//       select: { id: true, title: true },
//     });

//     if (!course) {
//       res.status(403).json({ error: "You do not teach this course" });
//       return;
//     }

//     if (lessonId) {
//       const video = await prisma.video.findFirst({
//         where: {
//           id: lessonId,
//           module: { courseId: course.id },
//         },
//         select: { id: true },
//       });

//       if (!video) {
//         res.status(404).json({ error: "Lesson not found in this course" });
//         return;
//       }
//     }

//     const roomId = await createVideoSDKRoom();

//     const liveMeeting = await prisma.liveMeeting.create({
//       data: {
//         title: `Live Class - ${course.title}`,
//         roomId,
//         teacherId: user.id,
//         tenantId: user.tenantId,
//         courseId: course.id,
//         videoId: lessonId ?? null,
//         status: "LIVE",
//         startedAt: new Date(),
//       },
//       select: { id: true, roomId: true },
//     });

//     res.status(201).json({
//       roomId: liveMeeting.roomId,
//       liveClassId: liveMeeting.id,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

/**
 * POST /class/independent/create
 * Teacher-only. No course/lesson link — creates a standalone LiveMeeting row
 * using only base table columns (title, description, scheduledAt). If
 * scheduledAt is omitted or in the past, the meeting starts immediately
 * (status LIVE); otherwise it's created as SCHEDULED for later.
 */
export async function createIndependentMeeting(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    console.log("user : ", user);

    const parsed = createIndependentMeetingSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body", details: parsed.error.flatten() });
      return;
    }

    const { title, description, scheduledAt } = parsed.data;

    const tenantId = user.tenantId;

    const scheduledDate = scheduledAt ? new Date(scheduledAt) : null;
    if (scheduledAt && isNaN(scheduledDate!.getTime())) {
      res.status(400).json({ error: "Invalid scheduledAt date format" });
      return;
    }
    
    console.log("user Role : ", user.role);

    if (user.role !== "TEACHER") {
      res.status(403).json({ error: "Only teachers can start a live meeting" });
      return;
    }

    const startsImmediately = !scheduledDate || scheduledDate <= new Date();

    const roomId = await createVideoSDKRoom();

    const liveMeeting = await prisma.liveMeeting.create({
      data: {
        title,
        description: description ?? null,
        roomId,
        teacherId: user.userId,
        tenantId: tenantId,
        status: startsImmediately ? "LIVE" : "SCHEDULED",
        scheduledAt: scheduledDate,
        startedAt: startsImmediately ? new Date() : null,
      },
      select: { id: true, roomId: true, status: true },
    });

    res.status(201).json({
      roomId: liveMeeting.roomId,
      liveMeetingId: liveMeeting.id,
      status: liveMeeting.status,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /class/:liveClassId/token
 * Any authenticated user in the same tenant can join — these are free,
 * teacher-hosted live classes with no purchase/enrollment gate. The caller
 * gets "teacher" permissions if they own the LiveMeeting, "student" otherwise.
 * Works for both course-linked LiveClass rows and independent LiveMeeting rows.
 */
export async function getLiveClassToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { liveClassId } = req.params as { liveClassId?: string };

    if (!liveClassId) {
      res.status(400).json({ error: "liveClassId is required" });
      return;
    }

    const idParam = liveClassId as string;

    const tenantId = user.tenantId;

    const liveMeeting = await prisma.liveMeeting.findFirst({
      where: {
        OR: [
          { id: idParam },
          { roomId: idParam }
        ],
        tenantId: tenantId
      },
      select: {
        id: true,
        teacherId: true,
        roomId: true,
        status: true,
      },
    });

    if (!liveMeeting) {
      res.status(404).json({ error: "Live class not found" });
      return;
    }

    if (!liveMeeting.roomId) {
      res.status(409).json({ error: "This live class has no active room" });
      return;
    }

    // Free live class: no purchase/enrollment check. Anyone authenticated in
    // this tenant can join — teacher gets moderator permissions, everyone
    // else joins as a participant. tenantId scoping above already keeps this
    // isolated to the correct organization.
    const role: "teacher" | "student" =
      liveMeeting.teacherId === user.userId ? "teacher" : "student";

    const token = generateVideoSDKToken(role);

    res.status(200).json({ token, roomId: liveMeeting.roomId });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /class/:liveClassId/end
 * Only the teacher who owns this LiveMeeting can end it.
 */
export async function endLiveClass(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { liveClassId } = req.params as { liveClassId?: string };

    if (!liveClassId) {
      res.status(400).json({ error: "liveClassId is required" });
      return;
    }

    const idParam = liveClassId as string;

    const tenantId = user.tenantId;

    const liveMeeting = await prisma.liveMeeting.findFirst({
      where: {
        OR: [
          { id: idParam },
          { roomId: idParam }
        ],
        tenantId: tenantId
      },
      select: { id: true, teacherId: true, status: true },
    });

    if (!liveMeeting) {
      res.status(404).json({ error: "Live class not found" });
      return;
    }

    if (liveMeeting.teacherId !== user.userId) {
      res.status(403).json({ error: "Only the teacher who owns this live class can end it" });
      return;
    }

    if (liveMeeting.status === "ENDED") {
      res.status(200).json({ message: "Live class already ended" });
      return;
    }

    await prisma.liveMeeting.update({
      where: { id: liveMeeting.id },
      data: {
        status: "ENDED",
        endedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Live class ended" });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/live/classes
 * Fetch all active and scheduled live classes for the current tenant.
 */
export async function getTenantLiveClasses(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const tenantId = user.tenantId;

    const liveMeetings = await prisma.liveMeeting.findMany({
      where: {
        tenantId: tenantId,
        status: { in: ["LIVE", "SCHEDULED"] },
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        scheduledAt: true,
        startedAt: true,
        createdAt: true,
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    console.log("Live Meeting : ", liveMeetings);

    // Ensure LIVE classes appear first, followed by SCHEDULED/upcoming classes (most recent first)
    const statusPriority: Record<string, number> = { LIVE: 1, SCHEDULED: 2 };
    liveMeetings.sort((a, b) => {
      const priorityA = statusPriority[a.status] ?? 99;
      const priorityB = statusPriority[b.status] ?? 99;
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    res.status(200).json({ liveMeetings });
  } catch (error) {
    next(error);
  }
}