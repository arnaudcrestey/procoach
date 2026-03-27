"use client";

import { useState } from "react";

export function ShareButtons({ score }: { score: number }) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/`
      : "https://procoach.vercel.app/";

  const shareText = `J’ai réalisé un diagnostic sur ma situation professionnelle. Mon score d’alignement actuel : ${score} %. Découvrez votre propre positionnement en quelques minutes.`;

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

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
    <section className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-md sm:p-7">
      <h3 className="text-center text-xl font-semibold text-white sm:text-2xl">
        Recommander ce diagnostic
      </h3>

      <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-white/70">
        Partagez ce diagnostic avec une personne qui pourrait avoir besoin de faire le point sur sa situation.
      </p>

      <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-cyan-300">
          Texte proposé
        </p>

        <p className="text-sm leading-relaxed text-white/80 sm:text-[15px]">
          {shareText}
        </p>
      </div>

      <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          onClick={copyMessage}
          className="rounded-xl border border-white/20 px-4 py-3 text-center text-sm text-white transition hover:bg-white/10"
        >
          {copied ? "Message copié ✓" : "Copier le message"}
        </button>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/20 px-4 py-3 text-center text-sm text-white transition hover:bg-white/10"
        >
          LinkedIn
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/20 px-4 py-3 text-center text-sm text-white transition hover:bg-white/10"
        >
          WhatsApp
        </a>

        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/20 px-4 py-3 text-center text-sm text-white transition hover:bg-white/10"
        >
          X
        </a>
      </div>
    </section>
  );
}
