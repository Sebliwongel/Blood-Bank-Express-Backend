import { Router } from "express";
import { register, getProfile } from "./userController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

// User registration route
router.post("/users", register);

// User profile route (protected)
router.get("/api/user/profile", authMiddleware, getProfile);

export default router;

