import nodemailer from 'nodemailer';
import { env } from '../config/env';

const transporter = nodemailer.createTransport({
  host: env.nodemailer.host,
  port: env.nodemailer.port,
  secure: env.nodemailer.port === 465,
  auth: {
    user: env.nodemailer.user,
    pass: env.nodemailer.password
  }
});

export async function sendContactEmail({
  name,
  email,
  message
}: {
  name: string;
  email: string;
  message: string;
}) {
  await transporter.sendMail({
    to: env.adminEmail,
    from: env.nodemailer.user,
    subject: `New portfolio inquiry from ${name}`,
    text: `${name} (${email}) says: ${message}`
  });
}

export async function sendContactConfirmation({
  name,
  email
}: {
  name: string;
  email: string;
}) {
  await transporter.sendMail({
    to: email,
    from: env.nodemailer.user,
    subject: 'Thanks for reaching out',
    text: `Hi ${name},\n\nThanks for contacting us! We received your message and will get back to you shortly.\n\nBest,\n${env.adminEmail}`
  });
}

export async function sendMessageAcknowledgement({
  name,
  email
}: {
  name: string;
  email: string;
}) {
  await transporter.sendMail({
    to: email,
    from: env.nodemailer.user,
    subject: 'We have reviewed your message',
    text: `Hi ${name},\n\nJust a quick note to let you know we have reviewed your message and will follow up with any next steps soon.\n\nBest,\n${env.adminEmail}`
  });
}
