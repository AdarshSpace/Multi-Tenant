
import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/DB.js";



const createTenantSchema = z.object({
  name: z.string().min(2).max(100),
  customDomain: z.string().min(4), // e.g. "motionkart.com"
  email: z.string().email().optional(),
  phone: z.string().optional(),
  logo: z.string().url().optional(),
});

async function generateUniqueSubdomain(base: string): Promise<string> {
    let candidate = base;
    let suffix = 1;
  
    while (true) {
      const existing = await prisma.tenant.findUnique({ where: { subdomain: candidate } });
      if (!existing) return candidate;
      suffix += 1;
      candidate = `${base}-${suffix}`;
    }
  }

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

  // e.g. "adarshspace.com" -> "adarshspace"
  const rawLabel = cleanDomain.split(".")[0] ?? "";
  const baseLabel = rawLabel.replace(/[^a-z0-9]/g, "") || "tenant";

  // resolve a free subdomain: try the base label, then base-2, base-3, ...
  const subdomain = await generateUniqueSubdomain(baseLabel);


  const existing = await prisma.tenant.findUnique({ where: { customDomain: cleanDomain } });
  if (existing) {
    return res.status(409).json({ error: "This domain is already registered" });
  }

  const tenant = await prisma.tenant.create({
    data: {
      name,
      slug: cleanDomain.replace(/\./g, "-"), // internal identifier only, e.g. "motionkart-com"
      subdomain,
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
