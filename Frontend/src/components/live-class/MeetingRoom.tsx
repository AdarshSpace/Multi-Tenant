"use client";

import { useEffect, useRef, useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { MeetingGrid } from "@/components/live-class/MeetingGrid";
import { Controls, type SidePanel } from "@/components/live-class/Controls";
import { Chat } from "@/components/live-class/Chat";
import { Poll } from "@/components/live-class/Poll";
import {
  AlertCircle,
  Shield,
  Users,
  MoreVertical,
  MessageSquare,
  BarChart2,
  X,
} from "lucide-react";
import { endLiveClass } from "@/lib/liveClass.api";
import { participantActivityStore } from "@/lib/Participantactivitystore";

interface MeetingRoomProps {
  liveMeetingId: string;
  isTeacher: boolean;
  meetingTitle: string;
  onMeetingLeft: () => void;
  secureContext: boolean;
}

function mediaErrorMessage(error: unknown): string {
  const name =
    typeof error === "object" && error && "name" in error
      ? String((error as { name: string }).name)
      : "";
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "object" && error && "message" in error
        ? String((error as { message: string }).message)
        : "Could not access camera/microphone";

  if (
    name === "ERROR_CAMERA_ACCESS_UNAVAILABLE" ||
    message.toLowerCase().includes("secure website")
  ) {
    return "Camera/mic need a secure page. Open the app on http://localhost:3001 or via https://.";
  }
  if (
    name.includes("PRODUCE_FAILED") ||
    message.includes("could not be published")
  ) {
    return "Media track was created but could not be published. Try toggling cam/mic again.";
  }
  return message;
}

export function MeetingRoom({
  liveMeetingId,
  isTeacher,
  meetingTitle,
  onMeetingLeft,
  secureContext,
}: MeetingRoomProps) {
  const mediaEnabledRef = useRef(false);
  const [mediaError, setMediaError] = useState<string | null>(
    secureContext
      ? null
      : "Camera/mic blocked: this page is not a secure context."
  );

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [sidePanel, setSidePanel] = useState<SidePanel>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const { participants, leave, enableWebcam, unmuteMic, localParticipant, presenterId,} = useMeeting({
    onMeetingLeft,
    onMeetingJoined: () => {
      if (mediaEnabledRef.current) return;
      mediaEnabledRef.current = true;

      if (!secureContext || !window.isSecureContext) {
        setMediaError(
          "Camera/mic blocked: this page is not a secure context."
        );
        return;
      }

      void (async () => {
        try {
          await unmuteMic();
        } catch (err) {
          console.warn("Could not enable microphone:", err);
          setMediaError(mediaErrorMessage(err));
        }
        try {
          await enableWebcam();
        } catch (err) {
          console.warn("Could not enable webcam:", err);
          setMediaError(mediaErrorMessage(err));
        }
      })();
    },
    onError: (error) => {
      console.warn("VideoSDK meeting error:", error);
      setMediaError(mediaErrorMessage(error));
    },
    onSpeakerChanged: (activeSpeakerId: string | null) => {
      participantActivityStore.setActiveSpeaker(activeSpeakerId);
    },
  });

  const participantIds = [...participants.keys()];

  function handleTogglePanel(panel: "chat" | "polls") {
    setSidePanel((prev) => (prev === panel ? null : panel));
  }

  async function handleLeave() {
    if (isTeacher) {
      try {
        await endLiveClass(liveMeetingId);
      } catch (e) {
        console.error("Failed to end meeting on server:", e);
      }
    }
    leave();
  }

  return (
    // Fit viewport under dashboard header/sidebar — no page scroll
    <div className="w-full h-[calc(100dvh-7.5rem)] md:h-[calc(100dvh-8.5rem)] flex flex-col overflow-hidden animate-in fade-in duration-300">
      {mediaError && (
        <div className="mb-2 flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-medium shrink-0">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{mediaError}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-1.5 bg-[#E11D48] text-white px-2 py-0.5 rounded-md shadow-sm shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              LIVE
            </span>
          </div>
          <h2 className="font-bold text-slate-900 text-base sm:text-lg truncate">
            {meetingTitle || "Live Class"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>{participantIds.length}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold shadow-sm">
            <Shield className="w-3.5 h-3.5 text-slate-500" />
            <span>{formatTimer(secondsElapsed)}</span>
          </div>
          <button
            type="button"
            className="p-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg shadow-sm cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className={`flex-1 min-h-0 grid gap-3 ${
          sidePanel
            ? "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px]"
            : "grid-cols-1"
        }`}
      >
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 flex flex-col min-h-0 overflow-hidden shadow-xl">
          <div className="flex-1 min-h-0 w-full">
            <MeetingGrid
              participantIds={participantIds}
              localParticipantId={localParticipant?.id}
              presenterId={presenterId}
            />
          </div>

          <div className="mt-2.5 sm:mt-3 shrink-0">
            <Controls
              isTeacher={isTeacher}
              onLeave={handleLeave}
              sidePanel={sidePanel}
              onTogglePanel={handleTogglePanel}
            />
          </div>
        </div>

        {sidePanel && (
          <div className="min-h-0 h-full max-h-full flex flex-col animate-in slide-in-from-right-2 fade-in duration-200">
            <div className="w-full flex flex-col h-full max-h-[min(100%,560px)] lg:max-h-none bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between gap-2 px-2.5 py-2 bg-slate-50 border-b border-slate-200 shrink-0">
                <div className="flex bg-slate-100 rounded-lg p-0.5 flex-1">
                  <button
                    type="button"
                    onClick={() => setSidePanel("chat")}
                    className={`flex-1 rounded-md px-2 py-1.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      sidePanel === "chat"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chat
                  </button>
                  <button
                    type="button"
                    onClick={() => setSidePanel("polls")}
                    className={`flex-1 rounded-md px-2 py-1.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      sidePanel === "polls"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    Polls
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setSidePanel(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-hidden">
                {sidePanel === "chat" ? (
                  <Chat embedded />
                ) : (
                  <Poll isTeacher={isTeacher} embedded />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
