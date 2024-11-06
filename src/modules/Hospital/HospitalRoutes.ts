import { Router } from "express";
import {
  createHospitalController,
  deleteHospitalController,
  getAllHospitalsController,
  getHospitalByIdController,
  updateHospitalController,
} from "./HospitalController";

const router = Router();

// Get all hospitals
router.get("/hospitals", getAllHospitalsController);

// Get a hospital by ID
router.get("/hospitals/:id", getHospitalByIdController);

// Create a new hospital
router.post("/hospitals", createHospitalController);

// Update a hospital by ID
router.patch("/hospitals/:id", updateHospitalController); // Updated to include the ID

// Delete a hospital by ID
router.delete("/hospitals/:id", deleteHospitalController); // Updated to include the ID

export default router;
