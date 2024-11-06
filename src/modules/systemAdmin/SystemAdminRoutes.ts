import { Router } from "express";
import {
  createSystemAdminController,
  deleteSystemAdminController,
  getAllSystemAdminsController,
  getSystemAdminByIdController,
  updateSystemAdminController,
} from "./SystemAdminController"; // Import the updated system admin controllers

const router = Router();

// Route for getting all system admins
router.get("/system-admin", getAllSystemAdminsController);

// Route for getting a system admin by ID
router.get("/system-admin/:id", getSystemAdminByIdController);

// Route for creating a new system admin
router.post("/system-admin", createSystemAdminController);

// Route for updating a system admin by ID
router.patch("/system-admin/:id", updateSystemAdminController); // Updated to include the ID

// Route for deleting a system admin by ID
router.delete("/system-admin/:id", deleteSystemAdminController); // Updated to include the ID

export default router;
