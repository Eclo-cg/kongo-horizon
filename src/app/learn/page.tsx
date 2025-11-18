"use client";

import { useState } from "react";
import quiz from "@/data/quiz.json";
import { SectionHeader } from "@/components/section-header";

export default function LearnPage() {
  const q = quiz as { question: string; options: string[]; answer: number }[];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const submit = (i: number) => {
    if (done) return;
    if (i === q[idx].answer) setScore((s) => s + 1);
    if (idx + 1 < q.length) setIdx((v) => v + 1);
    else setDone(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <SectionHeader title="Apprendre" description="Petit quiz ludique sur l’histoire et la culture du Congo." />
      {!done ? (
        <div className="rounded-lg border border-slate-200 p-6">
          <div className="mb-4 text-sm text-slate-600">Question {idx + 1} / {q.length}</div>
          <div className="text-lg font-medium text-slate-900">{q[idx].question}</div>
          <div className="mt-4 grid gap-2">
            {q[idx].options.map((opt, i) => (
              <button key={i} onClick={() => submit(i)} className="h-10 rounded-md border border-slate-200 px-3 text-left hover:bg-slate-50">
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 p-6 text-center">
          <div className="text-xl font-semibold">Score: {score} / {q.length}</div>
          <button className="mt-4 h-10 rounded-md border border-slate-200 px-4" onClick={() => { setIdx(0); setScore(0); setDone(false); }}>
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
}
