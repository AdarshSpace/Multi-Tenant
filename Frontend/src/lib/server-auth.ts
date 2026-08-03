import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAMES } from "./tokens";

export async function getServerAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_NAMES.access)?.value;
}

export async function authHeaders(
  extra?: HeadersInit
): Promise<Record<string, string>> {
  const accessToken = await getServerAccessToken();
  const headers: Record<string, string> = {};

  if (extra) {
    const entries =
      extra instanceof Headers
        ? [...extra.entries()]
        : Array.isArray(extra)
          ? extra
          : Object.entries(extra);
    for (const [key, value] of entries) {
      if (value !== undefined) headers[key] = String(value);
    }
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return Boolean(
    cookieStore.get(TOKEN_COOKIE_NAMES.access)?.value ||
      cookieStore.get(TOKEN_COOKIE_NAMES.refresh)?.value
  );
}
