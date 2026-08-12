"use client";

import { useState } from "react";
import { Radio, Loader2, ChevronRight, AlertCircle } from "lucide-react";

interface JoinScreenProps {
  isTeacher: boolean;
  userName: string;
  onCreateMeeting: (title: string, description: string) => void;
  onJoinMeeting: (meetingId: string) => void;
  loading: boolean;
  error: string | null;
  secureContext?: boolean;
}

export function JoinScreen({
  isTeacher,
  userName,
  onCreateMeeting,
  onJoinMeeting,
  loading,
  error,
  secureContext = true,
}: JoinScreenProps) {
  const [tab, setTab] = useState<"create" | "join">(isTeacher ? "create" : "join");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingIdInput, setMeetingIdInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (tab === "create") {
      if (!title.trim()) return;
      onCreateMeeting(title.trim(), description.trim());
    } else {
      if (!meetingIdInput.trim()) return;
      onJoinMeeting(meetingIdInput.trim());
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-[#0039a6] px-8 py-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Radio className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Live Class Lobby</h1>
                <p className="text-white/70 text-xs font-medium">
                  Real-time video sessions
                </p>
              </div>
            </div>
            <p className="text-sm text-white/80 font-medium mt-4">
              Welcome, {userName}
            </p>
          </div>

          <div className="px-8 py-8 space-y-6">
            {!secureContext && (
              <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Camera and microphone only work on{" "}
                  <strong>http://localhost:3001</strong> or{" "}
                  <strong>https://</strong>. Custom domains over plain HTTP
                  (e.g. http://adarshspace.com) are blocked by the browser.
                </span>
              </div>
            )}

            {/* Tab switcher */}
            {isTeacher && (
              <div className="flex bg-slate-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setTab("create")}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    tab === "create"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Create Meeting
                </button>
                <button
                  type="button"
                  onClick={() => setTab("join")}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                    tab === "join"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Join Meeting
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "create" ? (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      Meeting Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. React Hooks Deep Dive"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0039a6]/50 focus:ring-2 focus:ring-[#0039a6]/10 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      Description{" "}
                      <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief topic overview…"
                      rows={3}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0039a6]/50 focus:ring-2 focus:ring-[#0039a6]/10 transition-all resize-none"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Meeting ID or Room ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={meetingIdInput}
                    onChange={(e) => setMeetingIdInput(e.target.value)}
                    placeholder="Enter database ID or standard Room ID"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0039a6]/50 focus:ring-2 focus:ring-[#0039a6]/10 transition-all"
                    required
                  />
                  <p className="text-xs text-slate-400 font-medium mt-1.5">
                    Enter the code provided by the teacher (e.g. `cuid` or `xxxx-xxxx-xxxx`).
                  </p>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold animate-in fade-in duration-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0039a6] hover:bg-[#002d85] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{tab === "create" ? "Starting…" : "Joining…"}</span>
                  </>
                ) : (
                  <>
                    <span>{tab === "create" ? "Start Meeting" : "Join Meeting"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
