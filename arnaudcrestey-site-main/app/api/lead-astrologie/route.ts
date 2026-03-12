import nodemailer from "nodemailer";

let lastRequestTime = 0;

export async function POST(req: Request) {

  try {

    const now = Date.now();

    // Protection double appel (React dev mode)
    if (now - lastRequestTime < 3000) {
      return Response.json({ success: true });
    }

    lastRequestTime = now;

    const body = await req.json();

    const { firstName, email, birthDate, birthTime, birthPlace,score } = body;

    // Vérification champs
    if (!birthDate || !birthPlace) {

      return Response.json(
        { success: false, message: "Champs manquants" },
        { status: 400 }
      );

    }

    // Vérification variables env
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (!EMAIL_USER || !EMAIL_PASS) {

      console.error("Variables email manquantes");

      return Response.json(
        { success: false, message: "Configuration email incorrecte" },
        { status: 500 }
      );

    }

    // Configuration SMTP Gmail
    const transporter = nodemailer.createTransport({

      host: "smtp.gmail.com",
      port: 465,
      secure: true,

      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      },

      // nécessaire en dev local
      tls: {
        rejectUnauthorized: false
      }

    });

    // Envoi email
    const info = await transporter.sendMail({

      from: `"Astrae" <${EMAIL_USER}>`,

      to: "arnaud.crestey14@gmail.com",

      subject: "Nouvelle demande analyse astrale",

      html: `
        <h2>Nouveau lead Astrae</h2>

        <p><strong>Prénom :</strong> ${firstName ?? "Non renseigné"}</p>

        <p><strong>Date de naissance :</strong> ${birthDate}</p>

        <p><strong>Heure de naissance :</strong> ${birthTime || "Non renseignée"}</p>

        <p><strong>Lieu de naissance :</strong> ${birthPlace}</p>

        <hr>

        <p style="color:#666">
        Ce message provient automatiquement du formulaire ProCoach.
        </p>
      `
    });

    console.log("Email envoyé :", info.response);

    return Response.json({ success: true });

  } catch (error) {

    console.error("Erreur envoi mail :", error);

    return Response.json(
      { success: false, message: "Erreur serveur email" },
      { status: 500 }
    );

  }

}
