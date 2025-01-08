import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

export const emailConfig = {
    service: "gmail",
    auth: {
        user: "kumititadeses@gmail.com",
        // pass: "xiud kzdn ifgk shqb "
        pass: "kum@123t"
    },
};

// Optionally, export a Nodemailer transporter instance
export const emailTransporter = nodemailer.createTransport(emailConfig);
