import { Router } from "express";
import {
  createAppointmentController,
  getAllAppointmentsController,
  getAppointmentByIdController,
  updateAppointmentController,
  getScheduledAppointments,
} from "./AppointmentController"; // Assuming the controllers are in the AppointmentController file

const router = Router();

// Route to get scheduled appointments
router.get('/scheduled', getScheduledAppointments);

// Route to get all appointments
router.get("/appointments", getAllAppointmentsController);

// Route to get a single appointment by ID
router.get("/appointments/:id", getAppointmentByIdController);

// Route to create a new appointment
router.post("/appointments", createAppointmentController);

// Route to update an existing appointment by ID
router.patch("/appointments/:id", updateAppointmentController);

export default router;
