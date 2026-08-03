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

export function Chat() {
  const { localParticipant } = useMeeting();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // VideoSDK usePubSub expects string messages.
  const { publish, messages } = usePubSub("CHAT");

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    
    const payload: ChatMsg = {
      id: crypto.randomUUID(),
      senderId: localParticipant?.id ?? "",
      senderName: localParticipant?.displayName ?? "Unknown",
      message: text,
      timestamp: Date.now(),
    };

    publish(JSON.stringify(payload), { persist: true });
    setInput("");
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 border border-gray-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-slate-200 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#0039a6] flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-bold text-slate-900 text-sm">Live Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-400 text-sm font-medium text-center">
              No messages yet.
              <br />
              Be the first to say something!
            </p>
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
              timestamp: typeof msg.timestamp === "number" ? msg.timestamp : (Number(msg.timestamp) || Date.now()),
            };
          }
          
          const isMe = payload.senderId === localParticipant?.id;
          return (
            <div
              key={payload.id}
              className={`flex gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`}
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
                      : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"
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

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-slate-200 shrink-0">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-[#0039a6]/50 rounded-xl px-3 py-2 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message…"
            className="flex-1 bg-transparent outline-none text-sm text-slate-700 font-medium placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-8 h-8 rounded-lg bg-[#0039a6] hover:bg-[#002d85] disabled:bg-slate-200 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all duration-150 active:scale-95 shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
