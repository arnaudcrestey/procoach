import nodemailer from "nodemailer";

export const runtime = "nodejs";

let lastRequestTime = 0;

export async function POST(req: Request) {
  try {
    const now = Date.now();

    if (now - lastRequestTime < 3000) {
      return Response.json({ success: true });
    }

    lastRequestTime = now;

    const body = await req.json();

    const {
      firstName,
      email,
      birthDay,
      birthMonth,
      birthYear,
      birthHour,
      birthMinute,
      birthPlace,
      score,
    } = body;

    if (!firstName || !email || !birthDay || !birthMonth || !birthYear || !birthPlace) {
      return Response.json(
        { success: false, message: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const birthDate = `${birthDay}/${birthMonth}/${birthYear}`;
    const birthTime =
      birthHour && birthMinute ? `${birthHour}:${birthMinute}` : "Non précisée";

    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("Variables email manquantes");

      return Response.json(
        { success: false, message: "Configuration email incorrecte" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"Astrae" <${EMAIL_USER}>`,
      to: "arnaud.crestey14@gmail.com",
      replyTo: email,
      subject: "Nouveau LEAD PROCOACH",
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111;max-width:640px;margin:0 auto;padding:24px;">
          <h2>Nouveau LEAD PROCOACH</h2>

          <p><strong>Score :</strong> ${score ?? "Non calculé"}</p>
          <p><strong>Prénom :</strong> ${firstName}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Date de naissance :</strong> ${birthDate}</p>
          <p><strong>Heure de naissance :</strong> ${birthTime}</p>
          <p><strong>Lieu de naissance :</strong> ${birthPlace}</p>

          <hr style="border:none;border-top:1px solid #ddd;margin:24px 0;" />

          <p style="color:#666;font-size:12px;">
            Ce message provient automatiquement du formulaire ProCoach.
          </p>
        </div>
      `,
    });

    console.log("Email envoyé :", info.response);

    return Response.json({ success: true });
  } catch (error: any) {
    console.error("Erreur envoi mail :", error);

    return Response.json(
      {
        success: false,
        message: error?.message || "Erreur serveur email",
        code: error?.code || null,
        response: error?.response || null,
      },
      { status: 500 }
    );
  }
}
