import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 456,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendResetEmail = (to, token) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: "Password Reset Request",
    text: `Click the link to reset your password: ${resetLink}`,
  };
  return transporter.sendMail(mailOptions);
};
