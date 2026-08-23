"use client";

import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";

interface ParticipantViewProps {
  participantId: string;
  /** Smaller tile used in the screen-share filmstrip */
  compact?: boolean;
}

export function ParticipantView({
  participantId,
  compact = false,
}: ParticipantViewProps) {
  const micRef = useRef<HTMLAudioElement>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream && !isLocal) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((e) => console.error("Audio play error:", e));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn, isLocal]);

  useEffect(() => {
    if (webcamRef.current) {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        webcamRef.current.srcObject = mediaStream;
        webcamRef.current
          .play()
          .catch((e) => console.error("Video play error:", e));
      } else {
        webcamRef.current.srcObject = null;
      }
    }
  }, [webcamStream, webcamOn]);

  const getAvatarBg = (name?: string) => {
    if (!name) return "bg-blue-600";
    const char = name.trim().charAt(0).toUpperCase();
    if (char === "A") return "bg-blue-600";
    if (char === "T") return "bg-emerald-600";
    if (char === "M" || char === "S") return "bg-indigo-600";
    if (char === "R" || char === "K") return "bg-purple-600";
    return "bg-[#0039a6]";
  };

  const avatarSize = compact
    ? "w-10 h-10 text-base"
    : "w-16 h-16 sm:w-24 sm:h-24 text-2xl sm:text-4xl";

  return (
    <div
      className={`relative w-full h-full bg-[#1A2332] border border-slate-700/80 rounded-2xl overflow-hidden flex items-center justify-center group shadow-lg ${
        compact ? "min-h-0 aspect-video" : "min-h-0 aspect-video"
      }`}
    >
      <audio ref={micRef} autoPlay muted={isLocal} className="hidden" />

      {webcamOn ? (
        <video
          ref={webcamRef}
          autoPlay
          muted={isLocal}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-3 z-0">
          <div
            className={`${avatarSize} rounded-full ${getAvatarBg(
              displayName
            )} flex items-center justify-center text-white font-bold uppercase shadow-xl ring-4 ring-white/10`}
          >
            {displayName?.trim().charAt(0) ?? "?"}
          </div>
          {!compact && (
            <p className="text-white/60 text-sm font-medium truncate max-w-[80%]">
              {displayName}
              {isLocal ? " (You)" : ""}
            </p>
          )}
        </div>
      )}

      <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-md max-w-[70%] truncate z-10">
        <span className="truncate">
          {displayName}
          {isLocal ? " (You)" : ""}
        </span>
      </div>

      <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md p-1 rounded-lg border border-white/10 shadow-md z-10">
        {micOn ? (
          <div className="bg-emerald-500/20 text-emerald-400 p-1 rounded-md">
            <Mic className="w-3.5 h-3.5" />
          </div>
        ) : (
          <div className="bg-red-500/20 text-red-400 p-1 rounded-md">
            <MicOff className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}
