import { Router } from "express";
import {
  createQualificationController,
  deleteQualificationController,
  getAllQualificationsController,
  getQualificationByIdController,
  updateQualificationController,
} from "./QulificationController";

const router = Router();

// Get all qualifications
router.get("/qualifications", getAllQualificationsController);

// Get a qualification by ID
router.get("/qualifications/:id", getQualificationByIdController);

// Create a new qualification
router.post("/qualifications", createQualificationController);

// Update a qualification by ID
router.patch("/qualifications/:id", updateQualificationController); // Updated to include the ID

// Delete a qualification by ID
router.delete("/qualifications/:id", deleteQualificationController); // Updated to include the ID

export default router;
