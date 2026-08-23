"use client";

import { useState } from "react";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { BarChart2, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PollData {
  id: string;
  creatorId: string;
  creatorName: string;
  question: string;
  options: { text: string; votes: number }[];
  isActive: boolean;
}

interface VoteData {
  pollId: string;
  optionIndex: number;
  voterId: string;
}

interface PollProps {
  /** From app auth — VideoSDK participant has no teacher role */
  isTeacher?: boolean;
  embedded?: boolean;
}

export function Poll({ isTeacher = false, embedded = false }: PollProps) {
  const { localParticipant } = useMeeting();

  const [activePoll, setActivePoll] = useState<PollData | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [question, setQuestion] = useState("");
  const [optionsInputs, setOptionsInputs] = useState(["", ""]);

  const { publish: publishPoll } = usePubSub("POLL_STATE", {
    onMessageReceived: (message) => {
      try {
        const poll = JSON.parse(message.message) as PollData;
        setActivePoll(poll);
        if (poll) {
          setSelectedOption(null);
          setHasVoted(false);
        }
      } catch (e) {
        console.error("Failed to parse poll state:", e);
      }
    },
  });

  const { publish: publishVote } = usePubSub("POLL_VOTE", {
    onMessageReceived: (message) => {
      try {
        const vote = JSON.parse(message.message) as VoteData;
        setActivePoll((prev) => {
          if (!prev || prev.id !== vote.pollId) return prev;
          const updatedOptions = prev.options.map((opt, idx) => {
            if (idx === vote.optionIndex) {
              return { ...opt, votes: opt.votes + 1 };
            }
            return opt;
          });
          return { ...prev, options: updatedOptions };
        });
      } catch (e) {
        console.error("Failed to parse poll vote:", e);
      }
    },
  });

  function handleCreatePoll(e: React.FormEvent) {
    e.preventDefault();
    const validOptions = optionsInputs.filter((o) => o.trim() !== "");
    if (!question.trim() || validOptions.length < 2) return;

    const newPoll: PollData = {
      id: crypto.randomUUID(),
      creatorId: localParticipant?.id ?? "",
      creatorName: localParticipant?.displayName ?? "Teacher",
      question: question.trim(),
      options: validOptions.map((opt) => ({ text: opt.trim(), votes: 0 })),
      isActive: true,
    };

    void publishPoll(JSON.stringify(newPoll), { persist: true });
    setIsCreating(false);
    setQuestion("");
    setOptionsInputs(["", ""]);
  }

  function handleVote() {
    if (selectedOption === null || hasVoted || !activePoll) return;

    const vote: VoteData = {
      pollId: activePoll.id,
      optionIndex: selectedOption,
      voterId: localParticipant?.id ?? "",
    };

    void publishVote(JSON.stringify(vote), { persist: false });
    setHasVoted(true);
  }

  function handleEndPoll() {
    if (!activePoll) return;
    const endedPoll = { ...activePoll, isActive: false };
    void publishPoll(JSON.stringify(endedPoll), { persist: true });
  }

  const totalVotes = activePoll?.options.reduce((sum, o) => sum + o.votes, 0) || 0;

  return (
    <div
      className={`flex flex-col h-full overflow-hidden ${
        embedded ? "bg-white" : "bg-slate-50 border border-gray-200 rounded-2xl"
      }`}
    >
      {!embedded && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0039a6] flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Interactive Polls</h3>
          </div>
          {isTeacher && !activePoll && !isCreating && (
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-1 text-xs font-bold text-[#0039a6] hover:text-[#002d85] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              New Poll
            </button>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {isCreating ? (
          <form onSubmit={handleCreatePoll} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Question
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here…"
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#0039a6]/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Options
              </label>
              {optionsInputs.map((val, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={val}
                  onChange={(e) => {
                    const next = [...optionsInputs];
                    next[idx] = e.target.value;
                    setOptionsInputs(next);
                  }}
                  placeholder={`Option ${idx + 1}`}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#0039a6]/50"
                  required={idx < 2}
                />
              ))}
              {optionsInputs.length < 4 && (
                <button
                  type="button"
                  onClick={() => setOptionsInputs([...optionsInputs, ""])}
                  className="text-xs font-bold text-[#0039a6] hover:underline cursor-pointer"
                >
                  + Add Option
                </button>
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                type="submit"
                className="flex-1 bg-[#0039a6] hover:bg-[#002d85] text-white rounded-xl"
              >
                Launch Poll
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreating(false)}
                className="rounded-xl border-slate-200 text-slate-700"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : activePoll ? (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-400 font-semibold mb-1">
                Launched by {activePoll.creatorName}
              </p>
              <h4 className="font-bold text-slate-800 text-sm leading-snug">
                {activePoll.question}
              </h4>
            </div>

            <div className="space-y-2">
              {activePoll.options.map((opt, idx) => {
                const votesCount = opt.votes;
                const percent =
                  totalVotes > 0 ? Math.round((votesCount / totalVotes) * 100) : 0;
                const isSelected = selectedOption === idx;

                return (
                  <div key={idx} className="relative">
                    {activePoll.isActive && !hasVoted ? (
                      <button
                        type="button"
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left px-3 py-2.5 border rounded-xl font-medium text-sm transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-blue-50 border-blue-500 text-[#0039a6]"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{opt.text}</span>
                        {isSelected && <Check className="w-4 h-4" />}
                      </button>
                    ) : (
                      <div className="bg-white border border-slate-200 rounded-xl p-3 overflow-hidden relative">
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-blue-50 transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                        <div className="relative flex justify-between text-sm font-semibold text-slate-700 gap-2">
                          <span className="truncate">{opt.text}</span>
                          <span className="shrink-0 text-xs">
                            {votesCount} ({percent}%)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {activePoll.isActive && !hasVoted && (
              <Button
                onClick={handleVote}
                disabled={selectedOption === null}
                className="w-full bg-[#0039a6] hover:bg-[#002d85] text-white rounded-xl"
              >
                Submit Vote
              </Button>
            )}

            {isTeacher && activePoll.isActive && (
              <Button
                onClick={handleEndPoll}
                variant="destructive"
                className="w-full rounded-xl"
              >
                End Poll
              </Button>
            )}

            {!activePoll.isActive && (
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-center text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                This poll has ended
              </div>
            )}

            {isTeacher && !activePoll.isActive && (
              <button
                type="button"
                onClick={() => {
                  setActivePoll(null);
                  setIsCreating(true);
                }}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#0039a6] border border-blue-200 rounded-xl text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Create New Poll
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 px-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <BarChart2 className="w-5 h-5 text-slate-400" />
            </div>
            <h5 className="font-bold text-slate-800 text-sm mb-1">No active polls</h5>
            <p className="text-slate-400 text-xs max-w-[200px] leading-relaxed mb-4">
              {isTeacher
                ? "Create a poll to engage with participants."
                : "Waiting for the teacher to start a poll."}
            </p>
            {isTeacher && (
              <button
                type="button"
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0039a6] hover:bg-[#002d85] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Create Poll
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
