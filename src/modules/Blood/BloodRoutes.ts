import { Router } from "express";
import {
  createBloodController,
  deleteBloodController,
  getAllBloodController,
  getBloodByIdController,
  updateBloodController,
} from "./BloodController"; // Import controller methods

const router = Router();

// Route to get all blood records
router.get("/blood", getAllBloodController);

// Route to get a specific blood record by ID
router.get("/blood/:id", getBloodByIdController);

// Route to create a new blood entry
router.post("/blood", createBloodController);

// Route to update a blood entry by ID
router.patch("/blood/:id", updateBloodController);

// Route to delete a blood entry by ID
router.delete("/blood/:id", deleteBloodController);

export default router;
