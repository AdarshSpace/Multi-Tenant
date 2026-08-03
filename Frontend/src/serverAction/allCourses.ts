"use server";

import { authHeaders } from "@/lib/server-auth";

export const getAllCourses = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/getAll`, {
      headers: await authHeaders(),
      cache: "no-store",
    });

    const data = await response.json();

    if (!data.success) {
      console.error("Response Error : ", data.error);
      return { error: data.error };
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
