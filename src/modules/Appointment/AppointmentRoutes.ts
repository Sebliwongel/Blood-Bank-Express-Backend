import { Router } from "express";
import {
  createAppointmentController,
  deleteAppointmentController,
  getAllAppointmentsController,
  getAppointmentByIdController,
  updateAppointmentController,
} from "./AppointmentController";

const router = Router();

// Route to get all appointments
router.get("/appointments", getAllAppointmentsController);

// Route to get a single appointment by ID
router.get("/appointments/:id", getAppointmentByIdController);

// Route to create a new appointment
router.post("/appointments", createAppointmentController);

// Route to update an existing appointment by ID
router.patch("/appointments/:id", updateAppointmentController);

// Route to delete an appointment by ID
router.delete("/appointments/:id", deleteAppointmentController);

export default router;
