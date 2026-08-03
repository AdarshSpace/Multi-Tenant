"use server";

import { authHeaders } from "@/lib/server-auth";

export const generateAssessment = async (videoId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/video/${videoId}/generate-assessment`,
      {
        method: "POST",
        headers: await authHeaders({ "Content-Type": "application/json" }),
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
