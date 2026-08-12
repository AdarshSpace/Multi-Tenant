"use client";

import { useEffect, useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useSession } from "@/lib/auth";
import { createIndependentMeeting, getLiveClassToken,} from "@/lib/liveClass.api";
import { JoinScreen } from "@/components/live-class/JoinScreen";
import { MeetingRoom } from "@/components/live-class/MeetingRoom";
import { EndedScreen } from "@/components/live-class/EndedScreen";

export type PageState =
  | { stage: "join" }
  | {
      stage: "meeting";
      token: string;
      roomId: string;
      liveMeetingId: string;
      isTeacher: boolean;
    }
  | { stage: "ended" };

function isSecureMediaContext() {
  if (typeof window === "undefined") return false;
  // getUserMedia requires a secure context: https:// or localhost/127.0.0.1
  return window.isSecureContext;
}

export default function LiveClassClient() {
  const { data: session } = useSession();
  const user = session?.user;
  const isTeacher = user?.role === "TEACHER";
  const userName = user?.name ?? "Guest";

  const [pageState, setPageState] = useState<PageState>({ stage: "join" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("Live Class");
  const [secureContext, setSecureContext] = useState(true);

  useEffect(() => {
    setSecureContext(isSecureMediaContext());
  }, []);

  async function handleCreateMeeting(title: string, description: string) {
    setLoading(true);
    setError(null);
    try {
      const { liveMeetingId } = await createIndependentMeeting({
        title,
        description: description || undefined,
      });
      const { token, roomId } = await getLiveClassToken(liveMeetingId);
      console.log("token : ", token,  "roomId : ", roomId);
      setMeetingTitle(title);
      setPageState({
        stage: "meeting",
        token,
        roomId,
        liveMeetingId,
        isTeacher: true,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleJoinMeeting(liveMeetingId: string) {
    setLoading(true);
    setError(null);
    try {
      const { token, roomId } = await getLiveClassToken(liveMeetingId);
      setPageState({
        stage: "meeting",
        token,
        roomId,
        liveMeetingId,
        isTeacher: false,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleMeetingLeft() {
    setPageState({ stage: "ended" });
  }

  function handleBackToLobby() {
    setError(null);
    setPageState({ stage: "join" });
  }

  if (pageState.stage === "join") {
    return (
      <JoinScreen
        isTeacher={isTeacher}
        userName={userName}
        onCreateMeeting={handleCreateMeeting}
        onJoinMeeting={handleJoinMeeting}
        loading={loading}
        error={error}
        secureContext={secureContext}
      />
    );
  }

  if (pageState.stage === "ended") {
    return <EndedScreen onBackToLobby={handleBackToLobby} />;
  }

  const { token, roomId, liveMeetingId, isTeacher: isMeetingTeacher } =
    pageState;

  return (
    <MeetingProvider
      config={{
        meetingId: roomId,
        // Join without media; MeetingRoom enables cam/mic after join when secure.
        micEnabled: false,
        webcamEnabled: false,
        name: userName,
        multiStream: false,
        debugMode: false,
      }}
      token={token}
      joinWithoutUserInteraction={true}
    >
      <MeetingRoom
        liveMeetingId={liveMeetingId}
        isTeacher={isMeetingTeacher}
        meetingTitle={meetingTitle}
        onMeetingLeft={handleMeetingLeft}
        secureContext={secureContext}
      />
    </MeetingProvider>
  );
}
