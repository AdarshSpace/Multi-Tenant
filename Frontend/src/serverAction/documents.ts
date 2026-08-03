"use server";

import { authHeaders } from "@/lib/server-auth";

export const allDocuments = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/notes`, {
      headers: await authHeaders(),
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) {
      console.error("Response Error : ", data.error);
      return data.error;
    }

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
