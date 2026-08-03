import jwt from "jsonwebtoken";

type VideoSDKRole = "teacher" | "student";

interface VideoSDKTokenPayload {
  apikey: string;
  permissions: string[];
  version: number;
  roles: VideoSDKRole[];
}

interface CreateRoomResponse {
  roomId: string;
  disabled: boolean;
}

interface ValidateRoomResponse {
  roomId: string;
  disabled: boolean;
}

const VIDEOSDK_API_BASE_URL = "https://api.videosdk.live/v2";

/**
 * Generates a signed JWT for VideoSDK API/SDK authentication.
 * @param role - "teacher" (moderator) or "student" (participant)
 * @returns signed JWT string
 */
export function generateVideoSDKToken(role: VideoSDKRole): string {
  const apiKey = process.env.VIDEOSDK_API_KEY;
  const secretKey = process.env.VIDEOSDK_SECRET_KEY;

  if (!apiKey || !secretKey) {
    console.error("[videosdk.service] Missing VIDEOSDK_API_KEY or VIDEOSDK_SECRET_KEY in environment");
    throw new Error("VideoSDK credentials are not configured");
  }

  const permissions: string[] =
    role === "teacher" ? ["allow_join", "allow_mod"] : ["allow_join"];

  const payload: VideoSDKTokenPayload = {
    apikey: apiKey,
    permissions,
    version: 2,
    roles: [role],
  };

  const token = jwt.sign(payload, secretKey, {
    algorithm: "HS256",
    expiresIn: "2h",
  });

  return token;
}

/**
 * Creates a new VideoSDK room using a freshly generated teacher (moderator) token.
 * @returns the created room's roomId
 */
export async function createVideoSDKRoom(): Promise<string> {
    try {
      const token = generateVideoSDKToken("teacher");
  
      const response = await fetch(`${VIDEOSDK_API_BASE_URL}/rooms`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const error = await response.text();
        console.error("[videosdk.service] Failed to create room:", error);
        throw new Error("Failed to create VideoSDK room");
      }
  
      const data: CreateRoomResponse = await response.json();
      return data.roomId;
    } catch (error) {
      console.error("[videosdk.service] Error creating VideoSDK room:", error);
      throw new Error("Failed to create VideoSDK room");
    }
  }

/**
 * Validates whether a VideoSDK room exists and is active.
 * @param roomId - the room ID to validate
 * @returns true if the room is valid, false if validation fails for any reason
 */
export async function validateVideoSDKRoom(roomId: string): Promise<boolean> {
    try {
      const token = generateVideoSDKToken("student");
  
      const response = await fetch(
        `${VIDEOSDK_API_BASE_URL}/rooms/validate/${roomId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      if (!response.ok) {
        return false;
      }
  
      const data: ValidateRoomResponse = await response.json();
      return !data.disabled;
    } catch (error) {
      console.error("[videosdk.service] Failed to validate VideoSDK room:", error);
      return false;
    }
  }