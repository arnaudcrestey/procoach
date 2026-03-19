"use client";

import { useEffect, useState } from "react";

export function ShareButtons() {
  const [score, setScore] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedScore = localStorage.getItem("procoach_score");

    if (storedScore) {
      setScore(Number(storedScore));
    }
  }, []);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/`
      : "https://procoach.vercel.app/";

  const shareText = `J’ai réalisé un diagnostic sur ma situation professionnelle. Mon score d’alignement actuel : ${score ?? "?"} %. Découvrez votre propre positionnement en quelques minutes.`;

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md sm:p-6">
      <h3 className="text-center text-xl font-semibold text-white">
        Recommander ce diagnostic
      </h3>

      <p className="mx-auto mt-2 max-w-2xl text-center text-sm leading-relaxed text-white/70">
        Partagez ce diagnostic professionnel avec une personne qui pourrait avoir besoin de faire le point sur sa situation.
      </p>

      <div className="mx-auto mt-5 max-w-2xl rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-cyan-300">
          Message partagé
        </p>

        <p className="text-sm leading-relaxed text-white/80">
          {shareText}
        </p>
      </div>

      <div className="mx-auto mt-5 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/20 px-4 py-2 text-center text-sm text-white transition hover:bg-white/10"
        >
          LinkedIn
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/20 px-4 py-2 text-center text-sm text-white transition hover:bg-white/10"
        >
          WhatsApp
        </a>

        <button
          onClick={copyMessage}
          className="rounded-xl border border-white/20 px-4 py-2 text-center text-sm text-white transition hover:bg-white/10"
        >
          {copied ? "Copié ✓" : "Copier"}
        </button>

        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/20 px-4 py-2 text-center text-sm text-white transition hover:bg-white/10"
        >
          X
        </a>
      </div>
    </section>
  );
}
