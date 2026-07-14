"use server"

import { cookies } from "next/headers";

export const generateAssessment = async (videoId: string) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/video/${videoId}/generate-assessment`,
      {
        method: "POST",
        headers: {
          cookie: cookieStore.toString(),
          "content-type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Error generating assessment.",
      };
    }

    return data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to generate assessment. Please try again.",
    };
  }
};
