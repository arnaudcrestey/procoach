export type QuizQuestion = {
  id: number;
  label: string;
  dimension: "motivation" | "sens" | "energie" | "autonomie" | "progression";
  answers: { label: string; value: number; text: string }[];
};

export const quizQuestions: QuizQuestion[] = [

{
id: 1,
label: "Quand vous pensez à votre travail actuel...",
dimension: "motivation",
answers: [
{ label: "A", value: 1, text: "Je ressens souvent de la lassitude." },
{ label: "B", value: 2, text: "Cela dépend beaucoup des périodes." },
{ label: "C", value: 3, text: "Je me sens globalement motivé(e)." }
]},

{
id: 2,
label: "Dans vos missions quotidiennes...",
dimension: "sens",
answers: [
{ label: "A", value: 1, text: "Je peine à voir l’utilité réelle de ce que je fais." },
{ label: "B", value: 2, text: "Certaines tâches ont du sens, d’autres moins." },
{ label: "C", value: 3, text: "Je comprends clairement l’impact de mon travail." }
]},

{
id: 3,
label: "Quand vous imaginez votre avenir professionnel...",
dimension: "progression",
answers: [
{ label: "A", value: 3, text: "Je ressens un fort besoin de changement." },
{ label: "B", value: 2, text: "Je me pose encore des questions." },
{ label: "C", value: 1, text: "Je préfère rester dans une continuité." }
]},

{
id: 4,
label: "Au réveil, les jours de travail...",
dimension: "energie",
answers: [
{ label: "A", value: 1, text: "Je manque souvent d’énergie ou d’envie." },
{ label: "B", value: 2, text: "Cela dépend des journées." },
{ label: "C", value: 3, text: "Je démarre généralement avec énergie." }
]},

{
id: 5,
label: "Concernant la reconnaissance dans votre travail...",
dimension: "motivation",
answers: [
{ label: "A", value: 1, text: "Je me sens rarement reconnu(e)." },
{ label: "B", value: 2, text: "La reconnaissance est irrégulière." },
{ label: "C", value: 3, text: "Je me sens reconnu(e) pour ma contribution." }
]},

{
id: 6,
label: "Votre travail est-il en accord avec vos valeurs ?",
dimension: "sens",
answers: [
{ label: "A", value: 1, text: "Pas vraiment." },
{ label: "B", value: 2, text: "Partiellement." },
{ label: "C", value: 3, text: "Oui, clairement." }
]},

{
id: 7,
label: "Face à l’idée de changer de cap professionnel...",
dimension: "autonomie",
answers: [
{ label: "A", value: 1, text: "La peur du changement me freine." },
{ label: "B", value: 2, text: "J’y pense mais je reste prudent." },
{ label: "C", value: 3, text: "Je me sens capable de décider et d’agir." }
]},

{
id: 8,
label: "Dans votre travail quotidien...",
dimension: "autonomie",
answers: [
{ label: "A", value: 1, text: "Je subis beaucoup de contraintes." },
{ label: "B", value: 2, text: "J’ai une certaine marge de manœuvre." },
{ label: "C", value: 3, text: "Je dispose d’une vraie autonomie." }
]},

{
id: 9,
label: "Sur une semaine classique...",
dimension: "motivation",
answers: [
{ label: "A", value: 1, text: "Ma motivation chute rapidement." },
{ label: "B", value: 2, text: "Elle varie selon les jours." },
{ label: "C", value: 3, text: "Elle reste globalement stable." }
]},

{
id: 10,
label: "Concernant votre trajectoire professionnelle...",
dimension: "progression",
answers: [
{ label: "A", value: 1, text: "Je ne vois pas vraiment où je vais." },
{ label: "B", value: 2, text: "J’ai quelques idées mais rien de précis." },
{ label: "C", value: 3, text: "Ma direction est assez claire." }
]}
];

export type ProfileType = {
  id: 1 | 2 | 3 | 4 | 5;
  title: string;
  summary: string;
  vigilance: string[];
  growthTracks: string[];
};

export const profiles: Record<number, ProfileType> = {
  1: {
    id: 1,
    title: "Profession bloquée",
    summary:
      "Vous êtes resté trop longtemps dans un environnement qui ne correspond plus à votre évolution.",
    vigilance: [
      "Risque d'épuisement émotionnel",
      "Perte de confiance progressive",
      "Baisse d'impact professionnel"
    ],
    growthTracks: [
      "Identifier vos irritants clés",
      "Établir une stratégie de sortie réaliste",
      "Activer un réseau ciblé"
    ]
  },

  2: {
    id: 2,
    title: "Potentiel sous-exploité",
    summary:
      "Vos capacités sont supérieures aux opportunités offertes par votre poste actuel.",
    vigilance: [
      "Frustration chronique",
      "Sous-performance subie",
      "Dévalorisation des talents"
    ],
    growthTracks: [
      "Mapper vos compétences fortes",
      "Négocier des missions à plus fort levier",
      "Préparer un repositionnement métier"
    ]
  },

  3: {
    id: 3,
    title: "Phase de transition",
    summary:
      "Vous êtes dans une période charnière où des décisions importantes doivent être prises.",
    vigilance: [
      "Procrastination décisionnelle",
      "Surcharge mentale",
      "Risque de choix défensif"
    ],
    growthTracks: [
      "Clarifier 2 scénarios réalistes",
      "Définir un plan de test sur 30 jours",
      "Être accompagné sur la prise de décision"
    ]
  },

  4: {
    id: 4,
    title: "Désalignement personnel",
    summary:
      "Votre travail ne correspond plus à vos valeurs profondes.",
    vigilance: [
      "Perte de sens persistante",
      "Conflit interne",
      "Démotivation diffuse"
    ],
    growthTracks: [
      "Reformuler vos valeurs non négociables",
      "Repenser votre environnement de travail",
      "Explorer une reconversion alignée"
    ]
  },

  5: {
    id: 5,
    title: "Trajectoire cohérente",
    summary:
      "Votre trajectoire semble globalement alignée avec votre personnalité.",
    vigilance: [
      "Rester en mouvement",
      "Éviter la stagnation confortable",
      "Maintenir un cap long terme"
    ],
    growthTracks: [
      "Structurer votre prochaine étape",
      "Renforcer votre marque professionnelle",
      "Développer une vision à 3 ans"
    ]
  }
};

export function computeResults(answers: number[]) {

  const defaults = {
    motivation: 0,
    sens: 0,
    energie: 0,
    autonomie: 0,
    progression: 0
  };

  const totals = quizQuestions.reduce((acc, question, idx) => {
    const value = answers[idx] ?? 2;
    acc[question.dimension] += value;
    return acc;
  }, defaults);

  const averages = {
    motivation: Number((totals.motivation / 3).toFixed(1)),
    sens: Number((totals.sens / 2).toFixed(1)),
    energie: Number((totals.energie / 1).toFixed(1)),
    autonomie: Number((totals.autonomie / 2).toFixed(1)),
    progression: Number((totals.progression / 2).toFixed(1))
  };

  const globalScore =
    (averages.motivation +
      averages.sens +
      averages.energie +
      averages.autonomie +
      averages.progression) / 5;

  let profileId: 1 | 2 | 3 | 4 | 5 = 3;

  if (globalScore <= 1.6) profileId = 1;
  else if (averages.motivation <= 1.8 && averages.progression <= 2) profileId = 2;
  else if (averages.sens <= 1.8) profileId = 4;
  else if (globalScore >= 2.6) profileId = 5;

  return {
    profile: profiles[profileId],
    radar: [
      { subject: "Motivation", score: averages.motivation },
      { subject: "Sens", score: averages.sens },
      { subject: "Énergie", score: averages.energie },
      { subject: "Autonomie", score: averages.autonomie },
      { subject: "Progression", score: averages.progression }
    ]
  };
}
