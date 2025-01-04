import { Router } from "express";
import { register, getProfile } from "./userController";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { getAllUsers } from "./userController";

const router = Router();

// User registration routes
router.post("/users", register);
router.get("/users", getAllUsers);

// User profile route (protected)
router.get("/user/profile", authMiddleware, getProfile);

export default router;
