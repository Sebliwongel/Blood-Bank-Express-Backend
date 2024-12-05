// import { Request, Response } from "express";
// import { authenticateUser, refreshAccessToken } from "./authService";


// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   const tokens = await authenticateUser(email, password);
//   if (tokens) {
//     res.json(tokens);
//   } else {
//     res.status(401).json({ error: "Invalid email or password" });
//   }
// };

// export const refreshToken = (req: Request, res: Response) => {
//   const { refreshToken } = req.body;
//   const newAccessToken = refreshAccessToken(refreshToken);
//   if (newAccessToken) {
//     res.json({ accessToken: newAccessToken });
//   } else {
//     res.status(401).json({ error: "Invalid refresh token" });
//   }
// };

// import bcrypt from "bcrypt";
// import { Request, Response } from "express";
// import { generateToken, refreshAccessToken } from "../../modules/auth/authService";
// import { prisma } from "../../../prisma/prisma";




// /**
//  * Handle user login.
//  */
// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Generate access and refresh tokens
//     const accessToken = generateToken(
//       { id: user.id, email: user.email, role: user.role },
//       process.env.JWT_SECRET ?? "your_secret_key",
//       process.env.JWT_EXPIRES_IN ?? "1h"
//     );

//     const refreshToken = generateToken(
//       { id: user.id },
//       process.env.REFRESH_SECRET ?? "your_refresh_secret",
//       process.env.REFRESH_EXPIRES_IN ?? "7d"
//     );

//     res.json({ accessToken, refreshToken });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// /**
//  * Refresh access token using refresh token.
//  */
// export const refreshToken = (req: Request, res: Response) => {
//   const { refreshToken } = req.body;

//   try {
//     const newAccessToken = refreshAccessToken(refreshToken);
//     if (!newAccessToken) {
//       return res.status(401).json({ error: "Invalid refresh token" });
//     }

//     res.json({ accessToken: newAccessToken });
//   } catch (error) {
//     console.error("Token Refresh Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const logout = (req: Request, res: Response) => {
//   // Clear the refresh token cookie with same options as when it was set
//   res.clearCookie('refreshToken', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict'
//   });
  
//   return res.status(200).json({ message: "Successfully logged out" });
// };

import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { generateToken, refreshAccessToken } from "../../modules/auth/authService";
import { prisma } from "../../../prisma/prisma";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";
const RESET_SECRET_KEY = process.env.JWT_RESET_SECRET_KEY || "your-reset-secret-key"; // Different secret for reset token

/**
 * Handle user login.
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate access and refresh tokens
    const accessToken = generateToken(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET ?? "your_secret_key",
      process.env.JWT_EXPIRES_IN ?? "1h"
    );

    const refreshToken = generateToken(
      { id: user.id },
      process.env.REFRESH_SECRET ?? "your_refresh_secret",
      process.env.REFRESH_EXPIRES_IN ?? "7d"
    );

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Refresh access token using refresh token.
 */
export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const newAccessToken = refreshAccessToken(refreshToken);
    if (!newAccessToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Token Refresh Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Handle user logout.
 * Clear the refresh token cookie and invalidate the session.
 */
export const logout = (req: Request, res: Response) => {
  // Clear the refresh token cookie with same options as when it was set
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  
  return res.status(200).json({ message: "Successfully logged out" });
};

/**
 * Forgot password - send password reset link to the user's email.
 */
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  // Check if the email exists in the database
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate password reset token
  const resetToken = jwt.sign({ email: user.email }, RESET_SECRET_KEY, { expiresIn: "15m" });

  // Send the reset token via email
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider here
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Password Reset Request",
    text: `You can reset your password using the following link: 
      http://localhost:3000/api/auth/reset-password/${resetToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send reset email" });
  }
};

/**
 * Reset password route - verify token and update password in the database.
 */
export const resetPassword = async (req: Request, res: Response) => {
  const { resetToken, newPassword } = req.body;

  // Verify the reset token
  jwt.verify(resetToken, RESET_SECRET_KEY, async (err: Error | null, decoded: any) => {
    if (err) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Decode the token and retrieve the email
    const email = (decoded as any).email;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    try {
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      return res.status(200).json({ message: "Password has been successfully updated" });
    } catch (error) {
      console.error("Error updating password:", error);
      return res.status(500).json({ message: "Failed to update password" });
    }
  });
};
