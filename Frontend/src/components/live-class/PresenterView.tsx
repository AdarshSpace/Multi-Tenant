"use client";

import { useEffect, useRef } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import { Monitor } from "lucide-react";

interface PresenterViewProps {
  presenterId: string;
}

export function PresenterView({ presenterId }: PresenterViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { screenShareStream, screenShareOn, displayName, isLocal } =
    useParticipant(presenterId);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (screenShareOn && screenShareStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);
      el.srcObject = mediaStream;
      el.play().catch((e) => console.error("Screen share play error:", e));
    } else {
      el.srcObject = null;
    }
  }, [screenShareStream, screenShareOn]);

  return (
    <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden border border-slate-700">
      {screenShareOn ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-contain bg-black"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 gap-3">
          <Monitor className="w-10 h-10" />
          <p className="text-sm font-medium">Waiting for screen share…</p>
        </div>
      )}

      <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 z-10">
        <Monitor className="w-3.5 h-3.5 text-blue-400" />
        <span>
          {displayName}
          {isLocal ? " (You)" : ""} · Sharing
        </span>
      </div>
    </div>
  );
}
