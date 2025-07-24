import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"ChatZilla" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #2563eb;">Almost there, ${email}!</h2>
        <p>Please verify your email address to complete your ChatZilla registration:</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; padding: 12px 24px; 
                  background-color: #2563eb; color: white; 
                  border-radius: 5px; text-decoration: none;">
           Verify Email
        </a>
        <p style="margin-top: 20px; color: #666;">
          This link expires in 1 hour.<br>
          If you didn't request this, please ignore this email.
        </p>
      </div>
    `,
  });
};