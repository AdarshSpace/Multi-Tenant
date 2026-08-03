
import type { Request, Response } from "express";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/DB.js";

const router = Router();

const createTenantSchema = z.object({
  name: z.string().min(2).max(100),
  customDomain: z.string().min(4), // e.g. "motionkart.com"
  email: z.string().email().optional(),
  phone: z.string().optional(),
  logo: z.string().url().optional(),
});

 export const tenantRegistration = async (req: Request, res: Response) => {
  const parsed = createTenantSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { name, customDomain, email, phone, logo } = parsed.data;

  // normalize: remove protocol, www, trailing slash, lowercase
  const cleanDomain = customDomain
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

  const existing = await prisma.tenant.findUnique({ where: { customDomain: cleanDomain } });
  if (existing) {
    return res.status(409).json({ error: "This domain is already registered" });
  }

  const tenant = await prisma.tenant.create({
    data: {
      name,
      slug: cleanDomain.replace(/\./g, "-"), // internal identifier only, e.g. "motionkart-com"
      customDomain: cleanDomain,
      email: email ?? null,
      phone: phone ?? null,
      logo: logo ?? null,
      isActive: false, // 👈 important — see DNS verification note below
    },
  });

  return res.status(201).json({
    tenantId: tenant.id,
    customDomain: tenant.customDomain,
    // यहाँ आप teacher को DNS instructions भी दिखा सकते हैं
    dnsInstructions: `Please point an A record for ${cleanDomain} to <YOUR_SERVER_IP>`,
  });
};

export default router;