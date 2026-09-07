import type { Request, Response } from "express";
import { prisma } from "../../lib/DB.js";
import dns from "node:dns/promises";

export const verifyTenantDomain = async ( req: Request, res: Response ) => {
    try {
      const { tenantId } = req.params;
  
      const tenant = await prisma.tenant.findUnique({
                   where: {
                       id: tenantId as string,   
                    },
                  });
  
      if (!tenant) {
        return res.status(404).json({
          error: "Tenant not found",
        });
      }

      if (!tenant.customDomain) {
        return res.status(400).json({
          error: "This tenant has no custom domain to verify",
        });
      }
  
      /*
       * Normalize the domain before checking DNS.
       *
       * Example:
       * https://www.motionkart.com/
       * becomes:
       * motionkart.com
       */
  
      const cleanDomain = tenant.customDomain
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "");
  
      /*
       * The IP address of your backend/server.
       *
       * Example .env:
       *
       * SERVER_IP=123.456.78.90
       */
  
      const expectedIp = process.env.SERVER_IP;
  
      if (!expectedIp) {
        console.error( "SERVER_IP is not configured" );
  
        return res.status(500).json({
          error: "Server IP configuration is missing",
        });
      }
  
      let resolvedIps: string[] = [];
  
      try {
        /*
         * Resolve A records for the domain.
         */
  
        resolvedIps =  await dns.resolve4(cleanDomain);
      } catch (error) {
        /*
         * DNS resolution failed.
         */
  
        return res.status(200).json({
          verified: false,
  
          message:  "Domain is not pointing to the required server. DNS record could not be resolved.",
  
          expectedIp,
  
          resolvedIp: null,
        });
      }
  
      /*
       * Check whether our expected IP exists
       * in the domain's A records.
       */
  
      const verified = resolvedIps.includes(expectedIp);
  
      if (!verified) {
        return res.status(200).json({
          verified: false,
  
          message: "Domain is not pointing to the required server.",
  
          expectedIp,
  
          resolvedIp:
            resolvedIps.length > 0
              ? resolvedIps.join(", ")
              : null,
        });
      }
  
      /*
       * Domain is correctly pointing
       * to our server.
       */
  
      await prisma.tenant.update({
        where: {
          id: tenant.id,
        },
  
        data: {
          verified: true,
        },
      });
  
      return res.status(200).json({
        verified: true,
  
        message: "Domain verified successfully.",
  
        expectedIp,
  
        resolvedIp:
          resolvedIps.join(", "),
      });
    } catch (error) {
      console.error(
        "Domain verification error:",
        error
      );
  
      return res.status(500).json({
        error:
          "Failed to verify domain",
      });
    }
  };