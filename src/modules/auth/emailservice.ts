import nodemailer from "nodemailer";
import { emailConfig } from "../../config/emailconfig";

export const sendResetEmail = async (email: string, token: string) => {
    const transporter = nodemailer.createTransport(emailConfig);

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const message = `
        <p>You requested a password reset</p>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>
    `;

    await transporter.sendMail({
        to: email,
        subject: "Password Reset Request",
        html: message,
    });
};
