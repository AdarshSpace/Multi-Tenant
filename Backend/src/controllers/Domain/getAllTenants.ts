
import type { Request, Response } from "express";
import { prisma } from "../../lib/DB.js";


export const getTenants = async ( req: Request, res: Response ) => {
    try {
      const page = Math.max(
        Number(req.query.page) || 1,
        1
      );
  
      const limit = Math.min(
        Math.max(Number(req.query.limit) || 15, 1),
        100
      );
  
      const skip = (page - 1) * limit;
  
      const [tenants, total] =
        await Promise.all([
          prisma.tenant.findMany({
            skip,
            take: limit,
  
            orderBy: {
              createdAt: "desc",
            },
  
            select: {
              id: true,
              name: true,
              customDomain: true,
              email: true,
              phone: true,
              logo: true,
              verified: true,
            },
          }),
  
          prisma.tenant.count(),
        ]);
  
      const totalPages = Math.ceil(
        total / limit
      );
  
      return res.status(200).json({
        tenants,
  
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      });
    } catch (error) {
      console.error(
        "Get tenants error:",
        error
      );
  
      return res.status(500).json({
        error: "Failed to fetch tenants",
      });
    }
  };
  