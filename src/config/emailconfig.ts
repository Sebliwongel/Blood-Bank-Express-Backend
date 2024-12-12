import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

export const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.example.com', // Replace with your SMTP host
    port: parseInt(process.env.EMAIL_PORT || '587', 10), // Common ports are 587 or 465 for SMTP
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER || 'your-email@example.com', // Replace with your email address
        pass: process.env.EMAIL_PASSWORD || 'your-email-password', // Replace with your email password
    },
};

// Optionally, export a Nodemailer transporter instance
export const emailTransporter = nodemailer.createTransport(emailConfig);
