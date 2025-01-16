import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import "dotenv/config";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, message } = req.body;
    let transporter = nodemailer.createTransport({
      host: "gmail.com",
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Nuovo messaggio da ${name}`,
        text: message,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Errore nell'invio dell'email" });
    }
  } else {
    res.status(405).json({ error: "Metodo non consentito" });
  }
}
