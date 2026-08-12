"use client";

import { Video } from "lucide-react";

interface EndedScreenProps {
  onBackToLobby: () => void;
}

export function EndedScreen({ onBackToLobby }: EndedScreenProps) {
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
          onClick={onBackToLobby}
          className="bg-[#0039a6] hover:bg-[#002d85] text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 cursor-pointer"
        >
          Back to Lobby
        </button>
      </div>
    </div>
  );
}