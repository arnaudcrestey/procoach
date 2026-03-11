"use client";

import { useEffect, useMemo, useState } from "react";
import { ProfileRadar } from "@/components/radar-chart";
import { ResultCard } from "@/components/result-card";
import { ShareButtons } from "@/components/share-buttons";
import { computeResults } from "@/lib/quiz";

export default function ResultPage() {

  const [answers, setAnswers] = useState<number[]>([]);
  const [analysis, setAnalysis] = useState("");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");

  const [analysisRequested, setAnalysisRequested] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Charger réponses quiz
  useEffect(() => {

    if (typeof window === "undefined") return;

    const rawAnswers = localStorage.getItem("procoach_answers");

    if (rawAnswers) {
      setAnswers(JSON.parse(rawAnswers));
    }

  }, []);

  // Calcul profil
  const result = useMemo(() => {

    if (!answers.length) return null;

    return computeResults(answers);

  }, [answers]);

  // Calcul score
  const alignmentScore = useMemo(() => {

    if (!result?.radar) return 0;

    let values: number[] = [];

    if (Array.isArray(result.radar)) {

      values = result.radar.map((item: any) => {

        if (typeof item === "number") return item;
        if (item?.value) return Number(item.value);
        if (item?.score) return Number(item.score);

        return 0;

      });

    } else {

      values = Object.values(result.radar).map((v: any) => Number(v));

    }

    if (!values.length) return 0;

    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const normalized = ((avg - 1) / 4) * 100;
    const score = Math.round(normalized);

    if (typeof window !== "undefined") {
      localStorage.setItem("procoach_score", score.toString());
    }

    return score;

  }, [result]);

  // Génération analyse IA
  useEffect(() => {

    if (!result) return;
    if (!alignmentScore) return;
    if (analysisRequested) return;

    setAnalysisRequested(true);

    async function generateAnalysis() {

      try {

        const res = await fetch("/api/diagnostic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            answers,
            profile: result?.profile?.title ?? "",
            score: alignmentScore
          })
        });

        const data = await res.json();

        if (data?.analysis) {
          setAnalysis(data.analysis);
        }

      } catch (error) {

        console.error("Erreur analyse :", error);

      }

    }

    generateAnalysis();

  }, [result, alignmentScore, answers, analysisRequested]);

  // Envoi formulaire
  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    if (sending) return;

    setSending(true);

    const data = {
      firstName,
      email,
      birthDate,
      birthTime,
      birthPlace
    };

    try {

      const res = await fetch("/api/lead-astrologie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.success) {

        setSubmitted(true);

      } else {

        alert("Une erreur est survenue.");

      }

    } catch (error) {

      console.error("Erreur envoi :", error);
      alert("Erreur de connexion au serveur.");

    }

    setSending(false);

  }

  // PAGE DE CONFIRMATION
  if (submitted) {

    return (

      <main className="flex min-h-screen items-center justify-center px-6 text-center">

        <div className="glass max-w-xl rounded-2xl p-10">

          <h2 className="text-3xl font-semibold mb-4">
            ✓ Demande envoyée
          </h2>

          <p className="text-white/80 leading-relaxed">
            Merci pour votre confiance.
          </p>

          <p className="mt-3 text-white/80 leading-relaxed">
            Votre première lecture personnalisée vous sera envoyée
            par email dans quelques instants.
          </p>

          <p className="mt-6 text-white/60 text-sm">
            Pensez à vérifier vos spams si vous ne voyez rien apparaître.
          </p>

          <div className="mt-8 text-white/80 font-semibold">
            Cabinet Astrae
          </div>

        </div>

      </main>

    );

  }

  return (

    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10">

      <h1 className="text-4xl font-bold">
        Voici votre diagnostic professionnel
      </h1>

      <p className="mt-2 text-white/75">
        Analyse générée automatiquement à partir de vos réponses.
      </p>

      {result && (

        <section className="mt-8 grid gap-6 md:grid-cols-2">

          {result.profile && (
            <ResultCard profile={result.profile} />
          )}

          {result.radar && (
            <ProfileRadar data={result.radar} />
          )}

        </section>

      )}

      {/* SCORE */}

      <section className="glass mt-8 rounded-2xl p-6 text-center">

        <p className="text-lg text-white/80">
          Score d’alignement professionnel actuel
        </p>

        <p className="mt-2 text-4xl font-bold text-neon">
          {alignmentScore}%
        </p>

        <p className="mt-2 text-white/60 text-sm">
          Score moyen des participants : 54 %
        </p>

      </section>

      {/* PARTAGE */}

      <section className="mt-6 text-center">

        <p className="text-white/70 mb-3">
          Partagez votre diagnostic avec vos collègues ou amis.
        </p>

        <ShareButtons />

      </section>

      {/* ANALYSE IA */}

      {analysis && (

        <section className="glass mt-8 rounded-2xl p-6">

          <h3 className="text-xl font-semibold mb-3">
            Analyse personnalisée
          </h3>

          <p className="text-white/80 leading-relaxed">
            {analysis}
          </p>

        </section>

      )}

      {/* FORMULAIRE ASTRAE */}

      <section className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-10 text-center shadow-xl">

        <h2 className="text-3xl font-semibold mb-4">
          Comprendre réellement votre situation professionnelle
        </h2>

        <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
          Votre score suggère que certaines dynamiques professionnelles
          peuvent être liées à des facteurs plus profonds que le simple
          contexte de travail.
        </p>

        <p className="mt-4 text-white/80 max-w-2xl mx-auto leading-relaxed">
          Au <strong>Cabinet Astrae</strong>, l’étude du
          <strong> thème astral</strong> est utilisée comme outil
          d’introspection pour mieux comprendre les dynamiques
          personnelles qui influencent les choix de vie et
          les orientations professionnelles.
        </p>

        <p className="mt-6 text-white/70 max-w-2xl mx-auto leading-relaxed">
          Recevez gratuitement une première lecture personnalisée :
        </p>

        <form
  onSubmit={handleSubmit}
  className="mt-8 flex flex-col gap-4 w-full max-w-md mx-auto"
>

  <input
    type="text"
    placeholder="Votre prénom"
    value={firstName}
    onChange={(e)=>setFirstName(e.target.value)}
    required
    className="w-full rounded-xl bg-white px-4 py-3 text-black text-base outline-none focus:ring-2 focus:ring-cyan-400"
  />

  <input
    type="email"
    placeholder="Votre email pour recevoir votre analyse"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    required
    className="w-full rounded-xl bg-white px-4 py-3 text-black text-base outline-none focus:ring-2 focus:ring-cyan-400"
  />

  <div className="flex flex-col sm:flex-row gap-4">

    <input
      type="date"
      value={birthDate}
      onChange={(e)=>setBirthDate(e.target.value)}
      required
      className="w-full rounded-xl bg-white px-4 py-3 text-black text-base outline-none focus:ring-2 focus:ring-cyan-400"
    />

    <input
      type="time"
      value={birthTime}
      onChange={(e)=>setBirthTime(e.target.value)}
      className="w-full rounded-xl bg-white px-4 py-3 text-black text-base outline-none focus:ring-2 focus:ring-cyan-400"
    />

  </div>

  <input
    type="text"
    placeholder="Ville de naissance"
    value={birthPlace}
    onChange={(e)=>setBirthPlace(e.target.value)}
    required
    className="w-full rounded-xl bg-white px-4 py-3 text-black text-base outline-none focus:ring-2 focus:ring-cyan-400"
  />

  <button
    type="submit"
    disabled={!analysis || sending}
    className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-4 text-lg font-semibold text-white disabled:opacity-50 active:scale-95 transition"
  >
    Recevoir ma première analyse
  </button>

</form>

            <p className="mt-6 text-sm text-white/60">
          Vos informations restent confidentielles et ne seront jamais partagées.
        </p>

      </section>

    </main>

  );

}