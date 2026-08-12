"use client";

import { useRef, useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { ParticipantView } from "@/components/live-class/ParticipantView";
import { Controls } from "@/components/live-class/Controls";
import { Chat } from "@/components/live-class/Chat";
import { Poll } from "@/components/live-class/Poll";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AlertCircle, Video } from "lucide-react";
import { endLiveClass } from "@/lib/liveClass.api";

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
    return "Camera/mic need a secure page. Open the app on http://localhost:3001 or via https:// (custom HTTP domains block media).";
  }
  if (name.includes("PRODUCE_FAILED") || message.includes("could not be published")) {
    return "Media track was created but could not be published. Check network/firewall, then toggle cam/mic again.";
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
      : "Camera/mic blocked: this page is not a secure context. Use http://localhost:3001 or https://."
  );

  const { participants, leave, enableWebcam, unmuteMic } = useMeeting({
    onMeetingLeft,
    onMeetingJoined: () => {
      if (mediaEnabledRef.current) return;
      mediaEnabledRef.current = true;

      // Browsers block getUserMedia on http://custom-domain (non-localhost).
      if (!secureContext || !window.isSecureContext) {
        setMediaError(
          "Camera/mic blocked: this page is not a secure context. Use http://localhost:3001 or https://."
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
  });

  const participantIds = [...participants.keys()];

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
    <div className="animate-in fade-in duration-500">
      {mediaError && (
        <div className="mb-4 flex items-start gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{mediaError}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wide">
              Live
            </span>
          </div>
          <h2 className="font-bold text-slate-800 text-lg">{meetingTitle}</h2>
        </div>
        <span className="text-sm text-slate-400 font-medium">
          {participantIds.length} participant
          {participantIds.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
        <div className="flex flex-col gap-4">
          <div
            className={`grid gap-3 ${
              participantIds.length <= 1
                ? "grid-cols-1"
                : participantIds.length <= 4
                  ? "grid-cols-2"
                  : "grid-cols-3"
            }`}
          >
            {participantIds.map((id) => (
              <ParticipantView key={id} participantId={id} />
            ))}
            {participantIds.length === 0 && (
              <div className="aspect-video bg-slate-800 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white/50">
                  <Video className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">
                    Waiting for participants…
                  </p>
                </div>
              </div>
            )}
          </div>

          <Controls isTeacher={isTeacher} onLeave={handleLeave} />
        </div>

        <div className="h-[600px] lg:h-auto lg:min-h-[520px]">
          <Tabs
            defaultValue="chat"
            className="w-full flex flex-col h-full bg-slate-50 border border-gray-200 rounded-2xl overflow-hidden"
          >
            <TabsList className="bg-slate-100 p-1 rounded-t-2xl flex border-b border-slate-200 justify-start overflow-x-auto no-scrollbar shrink-0 z-20 relative">
              <TabsTrigger
                value="chat"
                className="rounded-xl px-6 py-2 text-xs font-bold tracking-tight data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500 transition-all cursor-pointer flex-1"
              >
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="polls"
                className="rounded-xl px-6 py-2 text-xs font-bold tracking-tight data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500 transition-all cursor-pointer flex-1"
              >
                Polls
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="mt-0 flex-1 min-h-0">
              <Chat />
            </TabsContent>
            <TabsContent value="polls" className="mt-0 flex-1 min-h-0">
              <Poll />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
