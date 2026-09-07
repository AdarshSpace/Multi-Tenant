const ACCESS_TOKEN_KEY = "mk_access_token";
const REFRESH_TOKEN_KEY = "mk_refresh_token";

const ACCESS_MAX_AGE = 60 * 60 * 24 * 3; // 3 days
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function isBrowser() {
  return typeof document !== "undefined";
}

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
}

function writeCookie(name: string, value: string, maxAge: number) {
  if (!isBrowser()) return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function clearCookie(name: string) {
  if (!isBrowser()) return;
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function getAccessToken(): string | null {
  return readCookie(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return readCookie(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string) {
  writeCookie(ACCESS_TOKEN_KEY, accessToken, ACCESS_MAX_AGE);
  writeCookie(REFRESH_TOKEN_KEY, refreshToken, REFRESH_MAX_AGE);
}

export function clearTokens() {
  clearCookie(ACCESS_TOKEN_KEY);
  clearCookie(REFRESH_TOKEN_KEY);
}

export const TOKEN_COOKIE_NAMES = {
  access: ACCESS_TOKEN_KEY,
  refresh: REFRESH_TOKEN_KEY,
} as const;
