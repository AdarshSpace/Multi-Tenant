"use client";

import { FileText } from "lucide-react";

interface AssignmentTabProps {
  assignment: any;
}

export function AssignmentTab({ assignment }: AssignmentTabProps) {
  if (!assignment || !assignment.questions || assignment.questions.length === 0) {
    return (
      <div className="col-span-full p-12 bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem] text-center">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500 font-bold">This lecture doesn't have an assignment yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-slate-50 border border-gray-300 rounded-2xl overflow-hidden p-8 space-y-8">
      <div>
        <h4 className="font-semibold text-slate-900 text-xl mb-1">{assignment.title}</h4>
        <p className="text-slate-500 text-sm font-medium">Total Questions: {assignment.totalQuestions}</p>
      </div>

      <div className="space-y-6">
        {assignment.questions.map((q: any, idx: number) => (
          <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h5 className="font-semibold text-slate-800 text-base leading-relaxed">
              <span className="text-[#0039a6] font-bold mr-2">Q{idx + 1}.</span> 
              {q.question}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}
