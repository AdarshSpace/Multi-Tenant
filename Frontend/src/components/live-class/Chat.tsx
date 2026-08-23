"use client";

import { useState, useRef, useEffect } from "react";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { Send, MessageSquare } from "lucide-react";

interface ChatMsg {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: number;
}

interface ChatProps {
  embedded?: boolean;
}

export function Chat({ embedded = false }: ChatProps) {
  const { localParticipant, participants } = useMeeting();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const { publish, messages } = usePubSub("CHAT");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;

    const payload: ChatMsg = {
      id: crypto.randomUUID(),
      senderId: localParticipant?.id ?? "",
      senderName: localParticipant?.displayName ?? "Unknown",
      message: text,
      timestamp: Date.now(),
    };
    try {
      await publish(JSON.stringify(payload), { persist: true });
      setInput("");
    } catch (error) {
      console.error("Failed to send chat message:", error);
    }
  }

  return (
    <div
      className={`flex flex-col h-full overflow-hidden ${
        embedded ? "bg-white" : "bg-white border border-gray-200 rounded-2xl shadow-sm"
      }`}
    >
      {!embedded && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0039a6] flex items-center justify-center text-white">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm leading-tight">Chat</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {participants.size} participants
              </p>
            </div>
          </div>
        </div>
      )}

      {embedded && (
        <div className="px-3 py-1.5 border-b border-slate-100 shrink-0">
          <p className="text-[11px] text-slate-500 font-medium">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 align-middle" />
            {participants.size} online
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 min-h-0">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-6">
            <MessageSquare className="w-8 h-8 text-slate-300 mb-2" />
            <h5 className="font-bold text-slate-800 text-sm mb-1">No messages yet</h5>
            <p className="text-slate-400 text-xs">Be the first to say something!</p>
          </div>
        )}
        {messages.map((msg) => {
          let payload: ChatMsg;
          try {
            payload = JSON.parse(msg.message);
          } catch {
            payload = {
              id: msg.id,
              senderId: msg.senderId,
              senderName: msg.senderName,
              message: msg.message,
              timestamp:
                typeof msg.timestamp === "number"
                  ? msg.timestamp
                  : Number(msg.timestamp) || Date.now(),
            };
          }

          const isMe = payload.senderId === localParticipant?.id;
          return (
            <div
              key={payload.id}
              className={`flex gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] flex flex-col gap-0.5 ${
                  isMe ? "items-end" : "items-start"
                }`}
              >
                {!isMe && (
                  <span className="text-[10px] text-slate-400 font-semibold px-1">
                    {payload.senderName}
                  </span>
                )}
                <div
                  className={`px-3 py-2 rounded-xl text-sm font-medium leading-relaxed ${
                    isMe
                      ? "bg-[#0039a6] text-white rounded-br-sm"
                      : "bg-slate-50 border border-slate-200 text-slate-700 rounded-bl-sm"
                  }`}
                >
                  {payload.message}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="px-3 py-2.5 border-t border-slate-200 shrink-0">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-[#0039a6]/50 rounded-xl px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void handleSend();
              }
            }}
            placeholder="Type a message…"
            className="flex-1 bg-transparent outline-none text-sm text-slate-700 font-medium placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={() => void handleSend()}
            disabled={!input.trim()}
            className="w-8 h-8 rounded-lg bg-[#0039a6] hover:bg-[#002d85] disabled:bg-slate-200 disabled:cursor-not-allowed text-white flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
