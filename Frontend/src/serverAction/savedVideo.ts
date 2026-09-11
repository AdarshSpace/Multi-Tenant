"use server";

import { authHeaders } from "@/lib/server-auth";

export const getAllSavedVideos = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/saveVideo/saved`, {
      headers: await authHeaders(),
      next: {
        revalidate: 300,
      },
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

export const deleteVideo = async (videoId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/saveVideo/saved/${videoId}`,
      {
        method: "DELETE",
        headers: await authHeaders(),
        cache: "no-store",
      }
    );

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
