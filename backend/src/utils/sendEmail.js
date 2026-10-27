import nodemailer from 'nodemailer';
import process from 'process';

 
export async function sendEmail(subject, html, to ) {
  // 1. Configure the transport layer using your Gmail configurations
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your personal Gmail address (e.g., ems@gmail.com)
      pass: process.env.EMAIL_PASS, // Your secure 16-character Google App Password
    },
  });

  try {
    // 2. Dispatch the payload to Google SMTP
    const data = await transporter.sendMail({
      from: `"EMS Portal" <${process.env.EMAIL_USER}>`, // Shows your app name in the inbox
      to: to || 'daniyal.asifjdk7778@gmail.com',        // Falls back to your test mail if 'to' is empty
      subject: subject,
      html: html,
    });

    // Return the response structured similarly to Resend for compatibility
    return { data, error: null };
  } catch (error) {
    console.error('Nodemailer runtime error:', error);
    return { data: null, error: error.message };
  }
}
