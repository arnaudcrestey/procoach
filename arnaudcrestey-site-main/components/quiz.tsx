"use client";

import { useMemo } from "react";
import type { QuizQuestion } from "@/lib/quiz";

type QuizProps = {
  current: number;
  total: number;
  question: QuizQuestion;
  onSelect: (value: number) => void;
};

export default function Quiz({ current, total, question, onSelect }: QuizProps) {

  // mélange les réponses une seule fois par question
  const shuffledAnswers = useMemo(() => {
    return [...question.answers].sort(() => Math.random() - 0.5);
  }, [question]);

  return (

    <section className="glass mt-10 rounded-2xl p-8">

      <p className="text-sm text-neon">
        Question {current} sur {total}
      </p>

      <h2 className="mt-2 text-2xl font-semibold">
        {question.label}
      </h2>

      <div className="mt-8 space-y-3">

        {shuffledAnswers.map((answer) => (

          <button
            key={answer.label}
            onClick={() => onSelect(answer.value)}
            className="flex w-full items-center justify-between rounded-xl border border-white/25 bg-white/5 px-5 py-4 text-left transition hover:border-neon/80 hover:bg-white/15"
          >

            <span className="font-semibold">
              {answer.label}
            </span>

            <span className="text-white/80">
              {answer.text}
            </span>

          </button>

        ))}

      </div>

    </section>

  );

}
