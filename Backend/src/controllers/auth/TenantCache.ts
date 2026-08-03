import { prisma } from "../../lib/DB.js";
import { redis } from "../../lib/redis.js";

const KEY_PREFIX = "tenant:domain:";      // tenant:domain:motionkart.online.com -> tenantId
const NEGATIVE_VALUE = "__NONE__";         // marks "checked, no active tenant found"

const POSITIVE_TTL_SECONDS = 60;           // known-good domain -> tenantId
const NEGATIVE_TTL_SECONDS = 15;           // unknown domain -> don't hammer the DB, but recheck soon

// Looks up a domain -> tenantId, Redis first, DB on cache miss.
export async function getTenantIdForDomain(domain: string): Promise<string | undefined> {
  const key = KEY_PREFIX + domain.toLowerCase();

  const cached = await redis.get(key);
  if (cached === NEGATIVE_VALUE) return undefined;
  if (cached) return cached;

  // cache miss -> hit the DB, then populate Redis either way
  const tenant = await prisma.tenant.findFirst({
    where: { customDomain: domain.toLowerCase(), isActive: true },
    select: { id: true },
  });

  if (tenant) {
    await redis.set(key, tenant.id, "EX", POSITIVE_TTL_SECONDS);
    return tenant.id;
  } else {
    await redis.set(key, NEGATIVE_VALUE, "EX", NEGATIVE_TTL_SECONDS);
    return undefined;
  }
}

// Call this right after a tenant's domain becomes active (DNS verified)
// so it works immediately instead of waiting for the negative-cache TTL to expire.
export async function setTenantDomainActive(domain: string, tenantId: string) {
  await redis.set(KEY_PREFIX + domain.toLowerCase(), tenantId, "EX", POSITIVE_TTL_SECONDS);
}

// Call this if a tenant is deactivated/suspended, so it stops being trusted immediately.
export async function invalidateTenantDomain(domain: string) {
  await redis.del(KEY_PREFIX + domain.toLowerCase());
}

export function extractHostFromOrigin(origin?: string | null): string | undefined {
  if (!origin) return undefined;
  try {
    return new URL(origin).hostname.toLowerCase();
  } catch {
    return undefined;
  }
}