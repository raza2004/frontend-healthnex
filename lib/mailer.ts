import nodemailer from "nodemailer";

export function getMailer() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) throw new Error("Missing GMAIL_USER / GMAIL_APP_PASSWORD");

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendMail(opts: { to: string; subject: string; html: string }) {
  const from = process.env.EMAIL_FROM || process.env.GMAIL_USER!;
  const transporter = getMailer();

  await transporter.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  });
}
