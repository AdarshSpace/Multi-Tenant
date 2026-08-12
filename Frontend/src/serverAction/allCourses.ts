"use server";

import { authHeaders } from "@/lib/server-auth";
import { redirect } from "next/navigation";

export const getAllCourses = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/getAll`, {
      headers: await authHeaders(),
      cache: "no-store",
    });

    const data = await response.json();

    if (response.status === 401) {
      redirect("/login");
    }

    if (!data.success) {
      console.error("Response Error : ", data.error ?? data.message);
      return { success: false, data: [], user: null, error: data.error ?? data.message };
    }

    return data;
  } catch (error) {
    // Next.js redirect() throws a special error — rethrow it
    if (error && typeof error === "object" && "digest" in error) throw error;
    console.log(error);
    return { success: false, data: [], user: null };
  }
};
