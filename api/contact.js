// api/contact.js
// API Vercel (Serverless Function)
// Envoie un email via Nodemailer + confirmation à l'expéditeur

import nodemailer from "nodemailer";

// Template HTML pour l'email que tu reçois
function createRecipientEmail(name, email, subject, message, language) {
  const title = language === 'fr' ? 'Nouveau message de contact' : 'New contact message';
  const fromLabel = language === 'fr' ? 'De' : 'From';
  const emailLabel = 'Email';
  const subjectLabel = language === 'fr' ? 'Sujet' : 'Subject';
  const messageLabel = 'Message';
  const footerText = language === 'fr'
    ? 'Ce message a été envoyé depuis votre portfolio.'
    : 'This message was sent from your portfolio.';

  return `
    <!DOCTYPE html>
    <html lang="${language}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f1e;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 40px 0;">
                    <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #1a1a2e; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 217, 255, 0.2);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #00d9ff 0%, #0096ff 100%); padding: 30px 40px; text-align: center;">
                                <h1 style="margin: 0; color: #0f0f1e; font-size: 24px; font-weight: 700;">${title}</h1>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px;">
                                <!-- From -->
                                <div style="margin-bottom: 25px; padding: 20px; background-color: rgba(0, 217, 255, 0.1); border-left: 4px solid #00d9ff; border-radius: 8px;">
                                    <p style="margin: 0 0 5px 0; color: #00d9ff; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${fromLabel}</p>
                                    <p style="margin: 0; color: #e0e0e0; font-size: 18px; font-weight: 600;">${name}</p>
                                </div>

                                <!-- Email -->
                                <div style="margin-bottom: 25px; padding: 20px; background-color: rgba(0, 217, 255, 0.1); border-left: 4px solid #00d9ff; border-radius: 8px;">
                                    <p style="margin: 0 0 5px 0; color: #00d9ff; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${emailLabel}</p>
                                    <p style="margin: 0; color: #e0e0e0; font-size: 16px;">
                                        <a href="mailto:${email}" style="color: #00d9ff; text-decoration: none;">${email}</a>
                                    </p>
                                </div>

                                <!-- Subject -->
                                <div style="margin-bottom: 25px; padding: 20px; background-color: rgba(0, 217, 255, 0.1); border-left: 4px solid #00d9ff; border-radius: 8px;">
                                    <p style="margin: 0 0 5px 0; color: #00d9ff; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${subjectLabel}</p>
                                    <p style="margin: 0; color: #e0e0e0; font-size: 16px; font-weight: 600;">${subject}</p>
                                </div>

                                <!-- Message -->
                                <div style="padding: 25px; background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(0, 217, 255, 0.2);">
                                    <p style="margin: 0 0 10px 0; color: #00d9ff; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${messageLabel}</p>
                                    <p style="margin: 0; color: #e0e0e0; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${message}</p>
                                </div>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px 40px; background-color: rgba(0, 0, 0, 0.3); text-align: center;">
                                <p style="margin: 0; color: #888; font-size: 12px;">${footerText}</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;
}

// Template HTML pour l'email de confirmation envoyé à l'expéditeur
function createConfirmationEmail(name, subject, message, language) {
  const recipientName = "Ulrich Babelinza";

  let title, greeting, thankYou, summary, subjectLabel, messageLabel, closing, footerText;

  if (language === 'fr') {
    title = 'Merci pour votre message !';
    greeting = `Bonjour ${name},`;
    thankYou = 'Je vous remercie pour votre prise de contact. Votre message a bien été reçu et je vous répondrai dans les plus brefs délais.';
    summary = 'Récapitulatif de votre message :';
    subjectLabel = 'Sujet';
    messageLabel = 'Message';
    closing = 'Cordialement,';
    footerText = 'Cet email est une confirmation automatique. Merci de ne pas y répondre directement.';
  } else {
    title = 'Thank you for your message!';
    greeting = `Hello ${name},`;
    thankYou = 'Thank you for reaching out. Your message has been received and I will respond to you as soon as possible.';
    summary = 'Summary of your message:';
    subjectLabel = 'Subject';
    messageLabel = 'Message';
    closing = 'Best regards,';
    footerText = 'This is an automatic confirmation email. Please do not reply directly to this message.';
  }

  return `
    <!DOCTYPE html>
    <html lang="${language}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f1e;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 40px 0;">
                    <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #1a1a2e; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 217, 255, 0.2);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #00d9ff 0%, #0096ff 100%); padding: 30px 40px; text-align: center;">
                                <h1 style="margin: 0; color: #0f0f1e; font-size: 24px; font-weight: 700;">${title}</h1>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px;">
                                <!-- Greeting -->
                                <p style="margin: 0 0 20px 0; color: #e0e0e0; font-size: 18px; font-weight: 600;">${greeting}</p>

                                <!-- Thank you message -->
                                <p style="margin: 0 0 30px 0; color: #b0b0b0; font-size: 15px; line-height: 1.8;">${thankYou}</p>

                                <!-- Summary section -->
                                <div style="margin-bottom: 30px; padding: 25px; background-color: rgba(0, 217, 255, 0.05); border-radius: 12px; border: 1px solid rgba(0, 217, 255, 0.2);">
                                    <p style="margin: 0 0 20px 0; color: #00d9ff; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${summary}</p>

                                    <!-- Subject -->
                                    <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                                        <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase;">${subjectLabel}</p>
                                        <p style="margin: 0; color: #e0e0e0; font-size: 15px;">${subject}</p>
                                    </div>

                                    <!-- Message -->
                                    <div>
                                        <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase;">${messageLabel}</p>
                                        <p style="margin: 0; color: #e0e0e0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                                    </div>
                                </div>

                                <!-- Closing -->
                                <p style="margin: 0 0 5px 0; color: #b0b0b0; font-size: 15px;">${closing}</p>
                                <p style="margin: 0; color: #00d9ff; font-size: 16px; font-weight: 600;">${recipientName}</p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px 40px; background-color: rgba(0, 0, 0, 0.3); text-align: center;">
                                <p style="margin: 0; color: #888; font-size: 12px;">${footerText}</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Autoriser uniquement la méthode POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Méthode non autorisée"
    });
  }

  // Récupérer les champs envoyés depuis le formulaire
  const { name, email, subject, message, language = 'fr' } = req.body;

  // Vérification des champs requis
  if (!name || !email || !subject || !message) {
    const errorMsg = language === 'fr'
      ? 'Tous les champs sont requis'
      : 'All fields are required';
    return res.status(400).json({ success: false, message: errorMsg });
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const errorMsg = language === 'fr'
      ? 'Adresse email invalide'
      : 'Invalid email address';
    return res.status(400).json({ success: false, message: errorMsg });
  }

  try {
    // Configuration du transporteur Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Envoyer l'email au propriétaire du portfolio (toi)
    const recipientSubject = language === 'fr'
      ? `[Portfolio] Nouveau message: ${subject}`
      : `[Portfolio] New message: ${subject}`;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: recipientSubject,
      html: createRecipientEmail(name, email, subject, message, language),
    });

    // 2. Envoyer l'email de confirmation à l'expéditeur
    const confirmSubject = language === 'fr'
      ? 'Confirmation de votre message - Portfolio Ulrich Babelinza'
      : 'Message confirmation - Portfolio Ulrich Babelinza';

    await transporter.sendMail({
      from: `"Ulrich Babelinza" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: confirmSubject,
      html: createConfirmationEmail(name, subject, message, language),
    });

    // Réponse succès
    const successMsg = language === 'fr'
      ? 'Message envoyé avec succès ! Vous recevrez une confirmation par email.'
      : 'Message sent successfully! You will receive a confirmation email.';

    return res.status(200).json({
      success: true,
      message: successMsg
    });

  } catch (error) {
    console.error("Erreur d'envoi mail:", error);

    const errorMsg = language === 'fr'
      ? "Erreur lors de l'envoi du message. Veuillez réessayer."
      : "Error sending message. Please try again.";

    return res.status(500).json({
      success: false,
      message: errorMsg
    });
  }
}
