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
Tu es un expert en orientation professionnelle et en dynamique de carrière.

Ta mission est de fournir une analyse claire, crédible et utile à partir
d’un diagnostic basé sur 10 questions concernant la situation professionnelle.

IMPORTANT
Le score exact d’alignement professionnel de cette personne est : ${score}%.
Ce score est calculé par le système et doit être repris exactement dans ton analyse.

Profil détecté : ${profile}

Réponses au questionnaire :
${JSON.stringify(answers)}

RÈGLES IMPORTANTES

- Adresse-toi directement à la personne en utilisant "vous".
- Ne parle jamais de "la personne".
- Le score doit apparaître exactement sous la forme : ${score}%.
- Le texte doit rester clair, naturel et crédible.
- Maximum : 60 à 80 mots.
- Évite tout ton moralisateur ou trop psychologique.

OBJECTIF

Aider l’utilisateur à comprendre rapidement :

- sa situation professionnelle actuelle
- les éventuels déséquilibres
- les premières pistes d'amélioration

STRUCTURE OBLIGATOIRE

Analyse de la situation

Rédige un paragraphe court expliquant ce que signifie un score de ${score}% pour la situation professionnelle actuelle.
Fais le lien avec les dimensions suivantes :
motivation, sens du travail, énergie, autonomie et progression.

Termine par une phrase ouvrant sur une réflexion plus profonde.

Explique que certaines dynamiques professionnelles peuvent être liées à des facteurs plus profonds :
personnalité, cycles de vie, besoins fondamentaux ou trajectoire personnelle.

Mentionne que le Cabinet Astrae propose une analyse plus approfondie
pour explorer ces dynamiques, notamment grâce à l’étude du thème astral.

IMPORTANT
Le score doit apparaître exactement : ${score}%.
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
