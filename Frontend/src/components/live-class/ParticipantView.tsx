"use client";

import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

interface ParticipantViewProps {
  participantId: string;
}

export function ParticipantView({ participantId }: ParticipantViewProps) {
  const micRef = useRef<HTMLAudioElement>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  // Attach audio stream to the audio element (never play local mic back to avoid echo)
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

  // Attach webcam stream to a video element
  const webcamRef = useRef<HTMLVideoElement>(null);
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

  return (
    <div className="relative bg-slate-800 rounded-2xl overflow-hidden aspect-video flex items-center justify-center group">
      {/* Audio (hidden) */}
      <audio ref={micRef} autoPlay muted={isLocal} className="hidden" />

      {/* Video */}
      {webcamOn ? (
        <video
          ref={webcamRef}
          autoPlay
          muted={isLocal}
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[#0039a6] flex items-center justify-center text-white text-2xl font-bold uppercase shadow-lg">
            {displayName?.charAt(0) ?? "?"}
          </div>
          <p className="text-white/70 text-sm font-medium">{displayName}</p>
        </div>
      )}

      {/* Overlay badges */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-xs text-white font-semibold bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg truncate max-w-[70%]">
          {displayName} {isLocal && "(You)"}
        </span>
        <div className="flex items-center gap-1.5">
          {micOn ? (
            <Mic className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <MicOff className="w-3.5 h-3.5 text-red-400" />
          )}
          {webcamOn ? (
            <Video className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <VideoOff className="w-3.5 h-3.5 text-red-400" />
          )}
        </div>
      </div>
    </div>
  );
}
