import type { Request, Response } from "express";
import { prisma } from "../../lib/DB.js";

export const getCourses = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user?.userId;

    if (!currentUserId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const [dbUser, courses] = await Promise.all([
      prisma.user.findUnique({
        where: { id: currentUserId },
        select: { id: true, name: true, email: true, role: true },
      }),
      prisma.course.findMany({
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
          teacher: {
            select: { name: true },
          },
          purchases: {
            where: { userId: currentUserId },
            select: { id: true, paid: true },
          },
        },
      }),
    ]);

    if (!dbUser) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const formattedCourses = courses.map((course) => ({
      ...course,
      paid: course.purchases.some((purchase) => purchase.paid),
    }));

    const userData = {
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      id: dbUser.id,
    };

    console.log("formattedCourses : ",formattedCourses)
    return res.status(200).json({
      success: true,
      data: formattedCourses,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};
