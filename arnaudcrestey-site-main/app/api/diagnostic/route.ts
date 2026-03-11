import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { answers, profile, score } = body;
    console.log("Score reçu :", score);

    const prompt = `
Tu es un expert en orientation professionnelle.

IMPORTANT :
Le score exact d'alignement professionnel de cette personne est : ${score}%.
Ce score est fourni par le système et doit être repris exactement dans ton analyse.

Profil détecté : ${profile}

Réponses au questionnaire :
${JSON.stringify(answers)}
IMPORTANT :
Rédige l’analyse en t’adressant directement à la personne.
Utilise "vous".
Ne parle jamais de "la personne".
Rédige une analyse claire et structurée (60 mots maximum) comprenant :

1. Une synthèse de la situation professionnelle actuelle
2. Les tensions ou déséquilibres possibles (motivation, sens, énergie, autonomie, progression)
3. Trois recommandations concrètes et réalistes pour améliorer la situation

Structure la réponse ainsi :

Analyse de la situation
[paragraphe]

Recommandations
1.
2.
3.

Conclusion

Termine par une ouverture expliquant que certaines dynamiques professionnelles
peuvent être liées à des facteurs plus profonds comme la personnalité,
la trajectoire de vie ou les cycles personnels.

Mentionne que le Cabinet Astrae propose une analyse plus approfondie,
notamment grâce à l’étude du thème astral.

IMPORTANT :
Le score doit rester exactement : ${score}%.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    });

    const analysis =
      completion.choices?.[0]?.message?.content ?? "Analyse indisponible.";

    return Response.json({ analysis });

  } catch (error) {

    console.error("OpenAI error:", error);

    return Response.json(
      { analysis: "Impossible de générer l'analyse pour le moment." },
      { status: 500 }
    );

  }

}