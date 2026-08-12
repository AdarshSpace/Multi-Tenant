"use client";

import { useMeeting } from "@videosdk.live/react-sdk";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users } from "lucide-react";

interface ControlsProps {
  isTeacher: boolean;
  onLeave: () => void;
}

export function Controls({ isTeacher, onLeave }: ControlsProps) {
  const { toggleMic, toggleWebcam, localMicOn, localWebcamOn, participants } =
    useMeeting({
      onError: (error) => {
        console.warn("VideoSDK controls error:", error);
      },
    });

  const participantCount = [...participants.keys()].length;

  async function handleToggleMic() {
    try {
      await toggleMic();
    } catch (err) {
      console.warn("Failed to toggle mic:", err);
    }
  }

  async function handleToggleWebcam() {
    try {
      await toggleWebcam();
    } catch (err) {
      console.warn("Failed to toggle webcam:", err);
    }
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 backdrop-blur-sm rounded-2xl border border-white/10">
      <div className="flex items-center gap-2 text-white/60">
        <Users className="w-4 h-4" />
        <span className="text-sm font-medium">{participantCount}</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => void handleToggleMic()}
          title={localMicOn ? "Mute microphone" : "Unmute microphone"}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            localMicOn
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-red-500/20 text-red-400 hover:bg-red-500/30 ring-2 ring-red-500/40"
          }`}
        >
          {localMicOn ? (
            <Mic className="w-5 h-5" />
          ) : (
            <MicOff className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={() => void handleToggleWebcam()}
          title={localWebcamOn ? "Turn off camera" : "Turn on camera"}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            localWebcamOn
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-red-500/20 text-red-400 hover:bg-red-500/30 ring-2 ring-red-500/40"
          }`}
        >
          {localWebcamOn ? (
            <Video className="w-5 h-5" />
          ) : (
            <VideoOff className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={onLeave}
          title={isTeacher ? "End meeting for everyone" : "Leave meeting"}
          className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg shadow-red-600/30"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>

      <div className="w-16" />
    </div>
  );
}
