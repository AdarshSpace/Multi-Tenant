import { apiFetch } from "./api";

export interface CreateIndependentMeetingPayload {
  title: string;
  description?: string;
  scheduledAt?: string;
}

export interface CreateIndependentMeetingResponse {
  roomId: string;
  liveMeetingId: string;
  status: "LIVE" | "SCHEDULED";
}

export async function createIndependentMeeting(payload: CreateIndependentMeetingPayload): Promise<CreateIndependentMeetingResponse> {
  const res = await apiFetch("/api/live/independent/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to create meeting");
  }

  return data as CreateIndependentMeetingResponse;
}

export interface GetTokenResponse {
  token: string;
  roomId: string;
}

export async function getLiveClassToken( liveMeetingId: string): Promise<GetTokenResponse> {
  const res = await apiFetch(`/api/live/class/${liveMeetingId}/token`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to get meeting token");
  }

  return data as GetTokenResponse;
}

export async function endLiveClass(liveMeetingId: string): Promise<void> {
  const res = await apiFetch(`/api/live/class/${liveMeetingId}/end`, {
    method: "POST",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to end meeting");
  }
}
