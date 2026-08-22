import { Resend } from 'resend';
import process from 'process';
export async function sendEmail(subject, html) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: 'daniyal.asifjdk7778@gmail.com',
    subject: subject,
    html: html,
  });
  return { data, error };
}
