"use client";

import { useState } from "react";
import { HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizTabProps {
  quiz: any;
}

export function QuizTab({ quiz }: QuizTabProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="col-span-full p-12 bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem] text-center">
        <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500 font-bold">This lecture doesn't have a quiz yet.</p>
      </div>
    );
  }

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q: any) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="flex flex-col bg-slate-50 border border-gray-300 rounded-2xl overflow-hidden p-8 space-y-8">
      <div>
        <h4 className="font-semibold text-slate-900 text-xl mb-1">{quiz.title}</h4>
        <p className="text-slate-500 text-sm font-medium">Total Questions: {quiz.totalQuestions}</p>
      </div>

      {isSubmitted && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
          <h5 className="font-bold text-lg mb-2 text-slate-800">Quiz Result</h5>
          <p className="text-slate-600 font-medium">
            Score: <span className="text-[#0039a6] font-extrabold">{calculateScore()} / {quiz.totalQuestions}</span>
          </p>
        </div>
      )}

      <div className="space-y-8">
        {quiz.questions.map((q: any, idx: number) => {
          const selectedIndex = selectedAnswers[q.id];
          const isActuallyCorrect = q.correctOptionIndex === selectedIndex;
          
          return (
            <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h5 className="font-bold text-slate-800 text-base mb-4">
                <span className="text-[#0039a6] mr-2">Q{idx + 1}.</span> 
                {q.question}
              </h5>
              
              <div className="space-y-3">
                {q.options.map((option: string, oIdx: number) => {
                  const isSelected = selectedIndex === oIdx;
                  const isOptionCorrect = q.correctOptionIndex === oIdx;
                  
                  let optionStyles = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";
                  
                  if (isSubmitted) {
                    if (isOptionCorrect) {
                      optionStyles = "bg-emerald-50 border-emerald-500 text-emerald-800";
                    } else if (isSelected && !isOptionCorrect) {
                      optionStyles = "bg-red-50 border-red-400 text-red-800";
                    } else {
                      optionStyles = "bg-slate-50 border-slate-200 text-slate-400 opacity-70";
                    }
                  } else if (isSelected) {
                    optionStyles = "bg-blue-50 border-blue-500 text-[#0039a6]";
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      disabled={isSubmitted}
                      className={`w-full text-left px-5 py-4 border rounded-xl font-medium transition-all duration-200 flex items-center justify-between ${optionStyles}`}
                    >
                      <span>{option}</span>
                      {isSubmitted && isOptionCorrect && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                      {isSubmitted && isSelected && !isOptionCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
                  <p className="text-sm text-blue-800 leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isSubmitted && (
        <div className="flex justify-end pt-4">
          <Button 
            onClick={() => setIsSubmitted(true)}
            size="lg"
            className="bg-[#0039a6] hover:bg-[#002d85] text-white px-8 rounded-xl font-bold"
          >
            Submit Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
