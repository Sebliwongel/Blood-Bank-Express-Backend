// emailService.ts
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { emailConfig } from "../../config/emailconfig";

const prisma = new PrismaClient();

/**
 * Sends a password reset email to the specified user.
 * @param email - The recipient's email address.
 * @param token - The unique reset token for password reset.
 */
export const sendResetEmail = async (email: string, token: string) => {
    const transporter = nodemailer.createTransport(emailConfig);

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const message = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h1>Reset Your Password</h1>
            <p>Hello,</p>
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetUrl}" style="color: #4A90E2;">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
        </div>
    `;

    try {
        const mail = await transporter.sendMail({
            from: emailConfig.auth.user,
            to: email,
            subject: "Password Reset Request",
            html: message,
        });
        return mail;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

/**
 * Generates a reset token, saves it to the database, and sends a password reset email.
 * @param email - The recipient's email address.
 */
export const initiatePasswordReset = async (email: string) => {
    if (!email) {
        throw new Error("Email is required");
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }

    const resetToken = Math.random().toString(36).substring(2, 15); // Simple token generation

    await prisma.user.update({
        where: { email },
        data: { resetToken },
    });

    await sendResetEmail(email, resetToken);
};
