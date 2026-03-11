"use client";

import { useRouter } from "next/navigation";

export default function StartPage() {

  const router = useRouter();

  function startQuiz() {

    router.push("/diagnostic");

  }

  return (

    <main className="flex min-h-screen items-center justify-center px-6">

      <div className="glass w-full max-w-md rounded-2xl p-10 text-center">

        <h1 className="text-3xl font-semibold mb-4">
          Diagnostic professionnel
        </h1>

        <p className="text-white/70 mb-6">
          Répondez à 10 questions pour faire le point sur votre situation professionnelle.
        </p>

        <button
          onClick={startQuiz}
          className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-4 text-lg font-semibold text-white"
        >
          Commencer le diagnostic
        </button>

      </div>

    </main>

  );

}