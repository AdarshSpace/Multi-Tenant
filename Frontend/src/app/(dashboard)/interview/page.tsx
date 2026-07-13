"use client";

import { useRef, useState } from "react";
import { Mic, Square } from "lucide-react";

export default function InterviewPage() {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const startRecording = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      const recorder = new MediaRecorder(stream);

      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(blob);

        setAudioUrl(url);
        setIsRecording(false);

        // Stop microphone tracks
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error(error);
      alert("Microphone permission denied");
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          AI Mock Interview
        </h1>

        <p className="mt-2 text-gray-600">
          Record your answer and receive AI-powered
          feedback on your communication skills.
        </p>

        <div className="mt-8">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-white hover:bg-purple-700"
            >
              <Mic size={18} />
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
            >
              <Square size={18} />
              Stop Recording
            </button>
          )}
        </div>

        {isRecording && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />

              <span className="font-medium text-red-700">
                Recording in progress...
              </span>
            </div>
          </div>
        )}

        {audioUrl && (
          <div className="mt-8 rounded-2xl border p-5">
            <div className="mb-4 flex items-center gap-2">
              <Mic className="text-purple-600" size={18} />

              <h2 className="font-semibold">
                Your Recorded Answer
              </h2>
            </div>

            <audio
              controls
              src={audioUrl}
              className="w-full"
            />

            <p className="mt-3 text-sm text-gray-500">
              Review your answer before submitting it
              for AI evaluation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}