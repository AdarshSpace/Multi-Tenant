"use server";

import { authHeaders } from "@/lib/server-auth";

export const fetchUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`, {
      headers: await authHeaders(),
      cache: "no-store",
    });

    const { details } = await res.json();

    if (!details) throw new Error("Failed to fetch user");

    return details;
  } catch (error) {
    console.log("Error fetching user details", error);
    return error as Error;
  }
};
