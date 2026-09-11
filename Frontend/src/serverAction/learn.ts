"use server";

import { authHeaders } from "@/lib/server-auth";

export const getCourse = async (courseId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/${courseId}/curriculum`,
      {
        headers: await authHeaders(),
        next: {
          revalidate: 300,
        },
      }
    );

    const data = await response.json();

    if (!data.success) {
      return data.error;
    }

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getChatHistory = async (courseId: string, videoId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/fetch/${courseId}/${videoId}`,
      {
        headers: await authHeaders(),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!data.success) {
      return data.error;
    }

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const sendChat = async (courseId: string, videoId: string, question: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/ask`, {
      method: "POST",
      headers: await authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ question, courseId, videoId }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!data.success) {
      return data.error;
    }

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
