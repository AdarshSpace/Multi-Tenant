"use client";

import { useState, useCallback, useEffect } from "react";
import {
  MeetingProvider,
  useMeeting,
} from "@videosdk.live/react-sdk";
import { useSession } from "@/lib/auth";
import {
  createIndependentMeeting,
  getLiveClassToken,
  endLiveClass,
} from "@/lib/liveClass.api";
import { JoinScreen } from "@/components/live-class/JoinScreen";
import { ParticipantView } from "@/components/live-class/ParticipantView";
import { Controls } from "@/components/live-class/Controls";
import { Chat } from "@/components/live-class/Chat";
import { Poll } from "@/components/live-class/Poll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  Loader2,
  AlertCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type PageState =
  | { stage: "join" }
  | { stage: "connecting" }
  | { stage: "meeting"; token: string; roomId: string; liveMeetingId: string; isTeacher: boolean }
  | { stage: "ended" }
  | { stage: "error"; message: string };

// JoinScreen is imported from components/live-class/JoinScreen

// ─────────────────────────────────────────────────────────────────────────────
// Meeting Room (rendered inside MeetingProvider)
// ─────────────────────────────────────────────────────────────────────────────

interface MeetingRoomProps {
  liveMeetingId: string;
  isTeacher: boolean;
  meetingTitle: string;
  onMeetingLeft: () => void;
}

function MeetingRoom({
  liveMeetingId,
  isTeacher,
  meetingTitle,
  onMeetingLeft,
}: MeetingRoomProps) {
  const { join, participants } = useMeeting({
    onMeetingLeft: onMeetingLeft,
  });

  // Join as soon as the component mounts
  useEffect(() => {
    join();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const participantIds = [...participants.keys()];

  async function handleLeave() {
    if (isTeacher) {
      try {
        await endLiveClass(liveMeetingId);
      } catch (e) {
        console.error("Failed to end meeting on server:", e);
      }
    }
    // MeetingProvider will fire onMeetingLeft which updates parent state
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wide">Live</span>
          </div>
          <h2 className="font-bold text-slate-800 text-lg">{meetingTitle}</h2>
        </div>
        <span className="text-sm text-slate-400 font-medium">
          {participantIds.length} participant{participantIds.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Main grid: video grid left + chat right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
        {/* Left: participant grid + controls */}
        <div className="flex flex-col gap-4">
          {/* Participant grid */}
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
                  <p className="text-sm font-medium">Waiting for participants…</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <Controls isTeacher={isTeacher} onLeave={handleLeave} />
        </div>

        {/* Right: Chat & Polls */}
        <div className="h-[600px] lg:h-auto lg:min-h-[520px]">
          <Tabs defaultValue="chat" className="w-full flex flex-col h-full bg-slate-50 border border-gray-200 rounded-2xl overflow-hidden">
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

// ─────────────────────────────────────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────────────────────────────────────

export default function LiveClassPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const isTeacher = user?.role === "TEACHER";
  const userName = user?.name ?? "Guest";

  const [pageState, setPageState] = useState<PageState>({ stage: "join" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Kept in state so MeetingRoom can display it even after the join screen unmounts
  const [meetingTitle, setMeetingTitle] = useState("Live Class");

  // ── Teacher: create a new independent meeting ──
  async function handleCreateMeeting(title: string, description: string) {
    setLoading(true);
    setError(null);
    try {
      const { liveMeetingId } = await createIndependentMeeting({ title, description });
      setMeetingTitle(title);
      // Now fetch the token for this meeting
      const { token, roomId } = await getLiveClassToken(liveMeetingId);
      setPageState({ stage: "meeting", token, roomId, liveMeetingId, isTeacher: true });
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // ── Student (or teacher): join an existing meeting by its liveMeetingId ──
  async function handleJoinMeeting(liveMeetingId: string) {
    setLoading(true);
    setError(null);
    try {
      const { token, roomId } = await getLiveClassToken(liveMeetingId);
      setPageState({ stage: "meeting", token, roomId, liveMeetingId, isTeacher: false });
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleMeetingLeft() {
    setPageState({ stage: "ended" });
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  if (pageState.stage === "join") {
    return (
      <JoinScreen
        isTeacher={isTeacher}
        userName={userName}
        onCreateMeeting={handleCreateMeeting}
        onJoinMeeting={handleJoinMeeting}
        loading={loading}
        error={error}
      />
    );
  }

  if (pageState.stage === "ended") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5">
            <Video className="w-9 h-9 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Meeting Ended
          </h2>
          <p className="text-slate-500 font-medium mb-8 text-sm">
            You have left the meeting.
          </p>
          <button
            onClick={() => {
              setError(null);
              setPageState({ stage: "join" });
            }}
            className="bg-[#0039a6] hover:bg-[#002d85] text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 cursor-pointer"
          >
            Back to Lobby
          </button>
        </div>
      </div>
    );
  }

  if (pageState.stage === "meeting") {
    const { token, roomId, liveMeetingId, isTeacher: isMeetingTeacher } = pageState;
    return (
      <MeetingProvider
        config={{
          meetingId: roomId,
          micEnabled: true,
          webcamEnabled: true,
          name: userName,
          multiStream: true,
          debugMode: false,
        }}
        token={token}
      >
        <MeetingRoom
          liveMeetingId={liveMeetingId}
          isTeacher={isMeetingTeacher}
          meetingTitle={meetingTitle}
          onMeetingLeft={handleMeetingLeft}
        />
      </MeetingProvider>
    );
  }

  // Fallback (should never render)
  return null;
}
