import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {
  authenticateDonor,
  authenticateHospital,
  authenticateUser,
  generateToken,
  refreshAccessToken,
} from "../../modules/auth/authService";
import { prisma } from "../../../prisma/prisma";
import dotenv from "dotenv";
import { sendResetEmail } from "./emailservice";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";
const RESET_SECRET_KEY =
  process.env.JWT_RESET_SECRET_KEY || "your-reset-secret-key"; // Different secret for reset token

/**
 * Handle user login with role specification.
 */
export const donorLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Authenticate the user and retrieve details including role
    const user = await authenticateDonor({
      email: email,
      password: password,
    });

    if (!user || "statusCode" in user) {
      return res.status(user?.statusCode || 401).json({
        error: user?.message || "Invalid credentials",
      });
    }

    return res.status(200).json({user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Handle user login with role specification.s
 */
export const HospitalLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Authenticate the user and retrieve details including role
    const Hospital = await authenticateHospital({
      email: email,
      password: password,
    });

    if (!Hospital || "statusCode" in Hospital) {
      return res.status(Hospital?.statusCode || 401).json({
        error: Hospital?.message || "Invalid credentials",
      });
    }

    return res.status(200).json({Hospital});
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Authenticate the user and retrieve details including role
    const user = await authenticateUser({
      email: email,
      password: password,
    });

    if (!user || "statusCode" in user) {
      return res.status(user?.statusCode || 401).json({
        error: user?.message || "Invalid credentials",
      });
    }

    return res.status(200).json({user });
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
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Successfully logged out" });
};

/**
 * Forgot password - send password reset link to the user's email.
 */
export const forgotPassword = async (req: Request, res: Response) => {
  try {
  const { email } = req.body;

  // Check if the email exists in the database
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = generateToken(user, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
  // Generate password reset token
  // const resetToken = jwt.sign(user, RESET_SECRET_KEY, {
  //   expiresIn: "15m",
  // });

  // Send the reset token via email
    const mail = await sendResetEmail(email, token);
    return res.status(200).json({ 
      message: "Password reset email sent",
      data: mail
     });
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
  jwt.verify(
    resetToken,
    RESET_SECRET_KEY,
    async (err: Error | null, decoded: any) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Invalid or expired reset token" });
      }

      // Decode the token and retrieve the email and role
      const { email, role } = decoded as { email: string; role: string };

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database
      try {
        await prisma.user.update({
          where: { email },
          data: { password: hashedPassword },
        });

        return res
          .status(200)
          .json({ message: `Password has been successfully updated for role: ${role}` });
      } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ message: "Failed to update password" });
      }
    }
  );
};
