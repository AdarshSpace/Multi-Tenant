import type { ParticipantActivity } from "./Participantactivitystore";

/**
 * Sorts participant IDs by priority:
 * 1. Local user ("You") — always first, so you never lose your own tile.
 * 2. Currently the dominant/active speaker.
 * 3. Most recently was the dominant speaker (recency desc).
 * 4. Mic on.
 * 5. Webcam on.
 * 6. Original order (stable).
 */
export function rankParticipants(
  ids: string[],
  activity: Map<string, ParticipantActivity>,
  localParticipantId?: string
): string[] {
  return [...ids].sort((a, b) => {
    if (a === localParticipantId) return -1;
    if (b === localParticipantId) return 1;

    const A = activity.get(a);
    const B = activity.get(b);

    const aSpeaking = A?.isSpeaking ? 1 : 0;
    const bSpeaking = B?.isSpeaking ? 1 : 0;
    if (aSpeaking !== bSpeaking) return bSpeaking - aSpeaking;

    const aLast = A?.lastSpokenAt ?? 0;
    const bLast = B?.lastSpokenAt ?? 0;
    if (aLast !== bLast) return bLast - aLast;

    const aMic = A?.micOn ? 1 : 0;
    const bMic = B?.micOn ? 1 : 0;
    if (aMic !== bMic) return bMic - aMic;

    const aCam = A?.webcamOn ? 1 : 0;
    const bCam = B?.webcamOn ? 1 : 0;
    if (aCam !== bCam) return bCam - aCam;

    return 0;
  });
}

/** Tailwind grid-cols class for a given tile count, matching the existing style. */
export function getGridColsClass(count: number): string {
  if (count <= 1) return "grid-cols-1 max-w-2xl mx-auto w-full h-full [&>*]:h-full";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2 w-full h-full auto-rows-fr";
  if (count <= 4) return "grid-cols-1 sm:grid-cols-2 w-full h-full auto-rows-fr";
  return "grid-cols-2 lg:grid-cols-3 w-full h-full auto-rows-fr";
}