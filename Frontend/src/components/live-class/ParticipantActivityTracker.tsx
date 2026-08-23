"use client";

import { useEffect } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import { participantActivityStore } from "@/lib/Participantactivitystore";

/**
 * Renders nothing. Its only job is to subscribe to a participant's
 * mic/webcam/name and push it into participantActivityStore, so the
 * grid can rank participants without every ParticipantView instance
 * needing to exist first.
 *
 * Only mounted when the meeting is large enough that we need to rank
 * who gets a visible tile (see MeetingGrid).
 */
export function ParticipantActivityTracker({
  participantId,
}: {
  participantId: string;
}) {
  const { micOn, webcamOn, displayName } = useParticipant(participantId);

  useEffect(() => {
    participantActivityStore.update(participantId, {
      micOn,
      webcamOn,
      displayName: displayName ?? "Participant",
    });
  }, [participantId, micOn, webcamOn, displayName]);

  useEffect(() => {
    return () => participantActivityStore.remove(participantId);
  }, [participantId]);

  return null;
}