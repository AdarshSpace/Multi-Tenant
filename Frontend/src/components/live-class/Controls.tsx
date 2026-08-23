"use client";

import { useMeeting } from "@videosdk.live/react-sdk";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MonitorUp, MonitorOff, Hand, Disc, MessageSquare, BarChart2,
} from "lucide-react";

export type SidePanel = "chat" | "polls" | null;

interface ControlsProps {
  isTeacher: boolean;
  onLeave: () => void;
  sidePanel: SidePanel;
  onTogglePanel: (panel: "chat" | "polls") => void;
}

export function Controls({ isTeacher, onLeave, sidePanel, onTogglePanel,}: ControlsProps) {

  const { toggleMic, toggleWebcam, toggleScreenShare, localMicOn, localWebcamOn, localScreenShareOn, } = useMeeting({
    onError: (error) => {
      console.warn("VideoSDK controls error:", error);
    },
  });

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

  async function handleToggleScreenShare() {
    try {
      await toggleScreenShare();
    } catch (err) {
      console.warn("Failed to toggle screen share:", err);
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 bg-[#111827]/95 backdrop-blur-md rounded-2xl border border-slate-800 flex items-center justify-between shadow-2xl gap-2 z-10">
      <div className="flex items-center gap-0.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => void handleToggleMic()}
          className="flex flex-col items-center gap-1 text-slate-300 hover:text-white group px-2 py-1 rounded-xl transition-all cursor-pointer shrink-0"
        >
          {localMicOn ? (
            <Mic className="w-5 h-5 text-slate-200" />
          ) : (
            <MicOff className="w-5 h-5 text-red-400" />
          )}
          <span className="text-[10px] sm:text-[11px] font-medium tracking-tight">
            {localMicOn ? "Mute" : "Unmute"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => void handleToggleWebcam()}
          className="flex flex-col items-center gap-1 text-slate-300 hover:text-white group px-2 py-1 rounded-xl transition-all cursor-pointer shrink-0"
        >
          {localWebcamOn ? (
            <Video className="w-5 h-5 text-slate-200" />
          ) : (
            <VideoOff className="w-5 h-5 text-red-400" />
          )}
          <span className="text-[10px] sm:text-[11px] font-medium tracking-tight whitespace-nowrap">
            {localWebcamOn ? "Stop Video" : "Start Video"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => void handleToggleScreenShare()}
          className={`flex flex-col items-center gap-1 group px-2 py-1 rounded-xl transition-all cursor-pointer shrink-0 ${
            localScreenShareOn
              ? "text-blue-400"
              : "text-slate-300 hover:text-white"
          }`}
          title={localScreenShareOn ? "Stop sharing" : "Share your screen"}
        >
          {localScreenShareOn ? (
            <MonitorOff className="w-5 h-5" />
          ) : (
            <MonitorUp className="w-5 h-5" />
          )}
          <span className="text-[10px] sm:text-[11px] font-medium tracking-tight whitespace-nowrap">
            {localScreenShareOn ? "Stop Share" : "Share Screen"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {}}
          className="hidden sm:flex flex-col items-center gap-1 text-slate-300 hover:text-white group px-2 py-1 rounded-xl transition-all cursor-pointer shrink-0"
        >
          <Hand className="w-5 h-5 text-slate-200" />
          <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
            Raise Hand
          </span>
        </button>

        {/* {isTeacher && (
          <button
            type="button"
            onClick={() => {}}
            className="hidden md:flex flex-col items-center gap-1 text-slate-300 hover:text-white group px-2 py-1 rounded-xl transition-all cursor-pointer shrink-0"
          >
            <Disc className="w-5 h-5 text-slate-200" />
            <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
              Record
            </span>
          </button>
        )} */}

        <div className="h-8 w-px bg-slate-800 mx-1 hidden sm:block shrink-0" />

        <button
          type="button"
          onClick={() => onTogglePanel("chat")}
          className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition-all cursor-pointer shrink-0 ${
            sidePanel === "chat"
              ? "text-blue-400 bg-blue-500/10"
              : "text-slate-300 hover:text-white"
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] sm:text-[11px] font-medium tracking-tight">
            Chat
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTogglePanel("polls")}
          className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition-all cursor-pointer shrink-0 ${
            sidePanel === "polls"
              ? "text-blue-400 bg-blue-500/10"
              : "text-slate-300 hover:text-white"
          }`}
        >
          <BarChart2 className="w-5 h-5" />
          <span className="text-[10px] sm:text-[11px] font-medium tracking-tight">
            Polls
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={onLeave}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-600/30 active:scale-95 shrink-0"
      >
        <PhoneOff className="w-4 h-4" />
        <span className="hidden xs:inline sm:inline">
          {isTeacher ? "End Class" : "Leave"}
        </span>
      </button>
    </div>
  );
}
