import nodemailer from 'nodemailer';
import process from 'process';

  // 1. Configure the transport layer using your Gmail configurations
  const transporter = nodemailer.createTransport({
    service: 'gmail',
      secure: true,
  pool: true, // <-- CRUCIAL FOR QUEUES: Reuses connections
  maxConnections: 5, // Max simultaneous connections to the SMTP server
  maxMessages: 100,
    auth: {
      user: process.env.EMAIL_USER, // Your personal Gmail address (e.g., ems@gmail.com)
      pass: process.env.EMAIL_PASS, // Your secure 16-character Google App Password
    },
  });
export async function sendEmail(mailOptions ) {
 

  try {
    // 2. Dispatch the payload to Google SMTP
    const data = await transporter.sendMail({
      from: `"EMS Portal | "<${process.env.EMAIL_USER}>`, // Shows your app name in the inbox
      to: mailOptions.to || 'daniyal.asifjdk7778@gmail.com',        // Falls back to your test mail if 'to' is empty
      subject: mailOptions.subject,
      html: mailOptions.html,
    });

    // Return the response structured similarly to Resend for compatibility
    return { data, error: null };
  } catch (error) {
    console.error('Nodemailer runtime error:', error);
    return { data: null, error: error.message };
  }
}
