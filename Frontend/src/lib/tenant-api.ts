// Thin API client for tenant registration + domain verification.
// Adjust NEXT_PUBLIC_API_URL in your .env.local to point at your backend.

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000";

export interface RegisterTenantPayload {
  name: string;
  customDomain: string;
  email?: string;
  phone?: string;
  logo?: string;
}

export interface RegisterTenantResponse {
  tenantId: string;
  customDomain: string;
  dnsInstructions: string;
}

export async function registerTenant(
  payload: RegisterTenantPayload
): Promise<RegisterTenantResponse> {
  const res = await fetch(`${API_BASE}/api/tenants/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("regis res : ", res)
  const data = await res.json();
  console.log("regis data : ", data)

  if (!res.ok) {
    const message =
      typeof data?.error === "string"
        ? data.error
        : "Something went wrong while registering the domain.";
    throw new Error(message);
  }

  return data as RegisterTenantResponse;
}

/**
 * Expected backend contract (you'll implement this):
 *
 * POST /api/tenant/verify-domain
 * body: { tenantId: string }
 *
 * 200 response:
 * {
 *   verified: boolean,
 *   message: string,        // human-readable status, shown in the alert box
 *   resolvedIp?: string,    // optional, for debugging/display
 *   expectedIp?: string     // optional, for debugging/display
 * }
 */
export interface VerifyDomainResponse {
  verified: boolean;
  message: string;
  resolvedIp?: string;
  expectedIp?: string;
}

export async function verifyDomain(
  tenantId: string
): Promise<VerifyDomainResponse> {
  const res = await fetch(`${API_BASE}/api/tenant/verify-domain`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenantId }),
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      typeof data?.error === "string"
        ? data.error
        : "Could not verify domain right now. Please try again.";
    throw new Error(message);
  }

  return data as VerifyDomainResponse;
}