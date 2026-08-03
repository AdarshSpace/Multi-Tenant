"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "./tokens";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
};

type AuthResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

type ApiError = {
  error?: string | { formErrors?: string[]; fieldErrors?: Record<string, string[]> };
  message?: string;
};

function getErrorMessage(data: ApiError, fallback: string) {
  if (typeof data.error === "string") return data.error;
  if (data.message) return data.message;
  if (data.error && typeof data.error === "object") {
    const formError = data.error.formErrors?.[0];
    if (formError) return formError;
    const fieldError = Object.values(data.error.fieldErrors ?? {})[0]?.[0];
    if (fieldError) return fieldError;
  }
  return fallback;
}

async function parseJson<T>(res: Response): Promise<T> {
  return (await res.json()) as T;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseJson<AuthResponse & ApiError>(res);
  if (!res.ok) {
    throw new Error(getErrorMessage(data, "Invalid email or password"));
  }

  setTokens(data.accessToken, data.refreshToken);
  return data.user;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthUser> {
  const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await parseJson<AuthResponse & ApiError>(res);
  if (!res.ok) {
    throw new Error(getErrorMessage(data, "Registration failed"));
  }

  setTokens(data.accessToken, data.refreshToken);
  return data.user;
}

export async function refreshTokens(): Promise<TokenPair | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const res = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    clearTokens();
    return null;
  }

  const data = await parseJson<TokenPair>(res);
  setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function logout(): Promise<void> {
  const refreshToken = getRefreshToken();
  try {
    if (refreshToken) {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
    }
  } finally {
    clearTokens();
  }
}

export async function getMe(): Promise<AuthUser | null> {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  let res = await fetch(`${BACKEND_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (res.status === 401) {
    const refreshed = await refreshTokens();
    if (!refreshed) return null;
    res = await fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${refreshed.accessToken}` },
      cache: "no-store",
    });
  }

  if (!res.ok) return null;
  const data = await parseJson<{ user: AuthUser }>(res);
  return data.user;
}

export async function exchangeHandoffCode(code: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/auth/exchange`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  const data = await parseJson<TokenPair & ApiError>(res);
  if (!res.ok) {
    throw new Error(getErrorMessage(data, "OAuth exchange failed"));
  }

  setTokens(data.accessToken, data.refreshToken);
}

export function startGoogleOAuth(callbackPath = "/courses") {
  const origin = window.location.origin;
  const url = new URL(`${BACKEND_URL}/api/auth/google`);
  url.searchParams.set("origin", origin);
  // backend redirects to /auth/callback; final destination is handled there
  sessionStorage.setItem("oauth_redirect", callbackPath);
  window.location.href = url.toString();
}

export function startGithubOAuth(callbackPath = "/courses") {
  const origin = window.location.origin;
  const url = new URL(`${BACKEND_URL}/api/auth/github`);
  url.searchParams.set("origin", origin);
  sessionStorage.setItem("oauth_redirect", callbackPath);
  window.location.href = url.toString();
}

export function useSession() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isPending, setIsPending] = useState(true);

  const refetch = useCallback(async () => {
    setIsPending(true);
    try {
      const me = await getMe();
      setUser(me);
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return {
    data: user ? { user } : null,
    isPending,
    refetch,
  };
}

/** Drop-in shape for places that previously used better-auth's authClient */
export const authClient = {
  useSession,
  login,
  register,
  logout,
  getMe,
  startGoogleOAuth,
  startGithubOAuth,
};
