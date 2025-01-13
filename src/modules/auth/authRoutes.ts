import { Router } from "express";
import {
  donorLogin,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  userLogin,
  hospitalLogin,
} from "./authController";

const router = Router();

// Login endpoint
router.post("/donor/login", donorLogin);
router.post("/user/login", userLogin);
router.post("/hospital/login", hospitalLogin );

// Refresh token endpoint
router.post("/refresh-token", refreshToken);

// Logout endpoint
router.post("/logout", logout);

// Password reset endpoints
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
