import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test orientation professionnelle gratuit | ProCoach",
  description:
    "Réalisez un bilan professionnel gratuit et découvrez en quelques minutes pourquoi votre vie professionnelle peut manquer de sens grâce à notre diagnostic IA.",
  alternates: {
    canonical: "/test-orientation-professionnelle",
  },
};

export default function SeoLandingPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <article className="glass rounded-3xl p-8 md:p-12">

        <h1 className="text-4xl font-bold md:text-5xl">
          Test orientation professionnelle : trouvez enfin une direction claire
        </h1>

        <p className="mt-6 text-white/85">
          Vous vous demandez souvent <strong>quel métier est fait pour vous</strong> ?
          Vous ressentez parfois une perte d’élan, une fatigue mentale ou un
          sentiment de stagnation professionnelle. Dans de nombreux cas, il ne
          s’agit pas d’un manque de compétences mais d’un problème
          d’<strong>alignement entre votre environnement professionnel et vos
          besoins profonds</strong>.
        </p>

        <p className="mt-4 text-white/85">
          Le diagnostic ProCoach vous permet d’obtenir en quelques minutes une
          première lecture de votre situation professionnelle grâce à une
          analyse basée sur cinq dimensions essentielles :
          <strong> motivation, sens, énergie, autonomie et progression</strong>.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">
          Pourquoi faire un bilan professionnel ?
        </h2>

        <p className="mt-4 text-white/85">
          Lorsque le travail devient source de frustration ou de fatigue, il
          est souvent difficile d’identifier précisément ce qui bloque.
          Un bilan professionnel permet de prendre du recul et de comprendre
          les déséquilibres entre vos attentes, vos compétences et votre
          environnement professionnel.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">
        Quand ce diagnostic est particulièrement utile ?
        </h2>

        <ul className="mt-4 space-y-2 text-white/85">
          <li>• perte de motivation au travail</li>
          <li>• sentiment de stagnation professionnelle</li>
          <li>• envie de reconversion ou de changement</li>
          <li>• difficulté à se projeter dans son avenir professionnel</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">
          Comment fonctionne le diagnostic ProCoach ?
        </h2>

        <p className="mt-4 text-white/85">
          Le test se compose de quelques questions simples permettant
          d’évaluer votre situation actuelle. En moins de deux minutes,
          vous obtenez :
        </p>

        <ul className="mt-4 space-y-2 text-white/85">
          <li>• un profil professionnel</li>
          <li>• un score d’alignement</li>
          <li>• une analyse personnalisée</li>
          <li>• des pistes concrètes d’évolution</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">
          Lancez votre diagnostic professionnel
        </h2>

        <p className="mt-4 text-white/85">
          En quelques minutes, ce diagnostic vous permettra de mieux
          comprendre votre situation professionnelle actuelle et d’identifier
          les premières pistes d’évolution.
        </p>

        <Link
          href="/diagnostic"
          className="mt-8 inline-block rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold text-white"
        >
          Faire le diagnostic gratuit
        </Link>

      </article>
    </main>
  );
}