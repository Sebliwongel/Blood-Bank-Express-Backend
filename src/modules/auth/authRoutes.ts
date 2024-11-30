import { Router } from "express";
import { login, refreshToken, logout, forgotPassword, resetPassword } from "./authController";

const router = Router();

// Login endpoint
router.post("/login", login);

// Refresh token endpoint
router.post("/refresh-token", refreshToken);

// Logout endpoint
router.post("/logout", logout);

// Password reset endpoints
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
