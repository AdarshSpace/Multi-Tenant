"use server";

import { authHeaders } from "@/lib/server-auth";

export type UserDetails = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
};

export const fetchUser = async (): Promise<UserDetails | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`, {
      headers: await authHeaders(),
      next: {
        revalidate: 3600,
      },
    });
    console.log('res : ',res)
    if (!res.ok) return null;

    const body = await res.json();
    if (!body?.details) return null;

    return body.details as UserDetails;
  } catch (error) {
    console.log("Error fetching user details", error);
    return null;
  }
};
