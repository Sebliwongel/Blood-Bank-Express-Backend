import { Request, Response } from "express";
import {
  createAppointment as createAppointmentService,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  getScheduledAppointments as getScheduledAppointmentsService,
} from "./AppointmentService";

// Get Scheduled Appointments
export const getScheduledAppointments = async (req: Request, res: Response) => {
  try {
    // Call the service function with req and res
    await getScheduledAppointmentsService(req, res);
  } catch (error) {
    // Handle unexpected errors
    const errorMessage = (error as Error).message || "An unexpected error occurred.";
    res.status(500).json({ message: errorMessage });
  }
};


// Create a new appointment
export const createAppointmentController = async (req: Request, res: Response) => {
  try {
    const { appointmentDate, status, location, appointmentTime } = req.body;

    const newAppointment = await createAppointmentService({
      appointmentDate,
      status,
      location,
      appointmentTime,
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Failed to create appointment", error: err.message });
  }
};

// Get all appointments
export const getAllAppointmentsController = async (req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Failed to retrieve appointments", error: err.message });
  }
};

// Get an appointment by ID
export const getAppointmentByIdController = async (req: Request, res: Response) => {
  const appointmentId = req.params.id; // Assuming the ID is passed as a route parameter
  try {
    const appointment = await getAppointmentById(parseInt(appointmentId));

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Failed to retrieve appointment", error: err.message });
  }
};

// Update an appointment
export const updateAppointmentController = async (req: Request, res: Response) => {
  const appointmentId = req.params.id; // Extract the appointment ID from request params
  try {
    const { appointmentDate, status, location, appointmentTime } = req.body;

    const updatedAppointment = await updateAppointment(parseInt(appointmentId), {
      appointmentDate,
      status,
      location,
      appointmentTime,
    });

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Failed to update appointment", error: err.message });
  }
};
