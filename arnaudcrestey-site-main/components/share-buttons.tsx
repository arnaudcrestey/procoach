"use client";

import { useEffect, useState } from "react";

export function ShareButtons() {

  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {

    const storedScore = localStorage.getItem("procoach_score");

    if (storedScore) {
      setScore(Number(storedScore));
    }

  }, []);

  const url =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://procoach";

const message = `Je viens de faire un diagnostic sur ma situation professionnelle.

Mon score : ${score ?? "?"} %
Score moyen des participants : 54 %

Et vous ?

👉 ${url}`;

  const encodedMessage = encodeURIComponent(message);

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}`;

  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

  return (

    <div className="flex flex-wrap justify-center gap-3">

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10"
      >
        Partager sur LinkedIn
      </a>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10"
      >
        Partager sur Twitter
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10"
      >
        Partager sur WhatsApp
      </a>

    </div>

  );
}