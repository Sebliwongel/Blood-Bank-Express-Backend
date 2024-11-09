import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewAppointmentSchema, UpdateAppointmentSchema } from "./AppointmentSchema";  // Assuming Zod schemas for Appointment
import { Request, Response } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
} from "./AppointmentService";

// Create a new appointment
export const createAppointmentController = async (req: Request, res: Response) => {
  try {
    // Validate and parse request data using NewAppointmentSchema
    const parsed = await validateAndParse(NewAppointmentSchema, req);

    // Create the new appointment in the database
    const newAppointment = await createAppointment(
      parsed.appointmentDate,  // parsed appointment date from request
      parsed.status,            // parsed status from request
      parsed.donorId            // parsed donorId from request
    );

    // Return the newly created appointment
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
};

// Get all appointments
export const getAllAppointmentsController = async (req: Request, res: Response) => {
  try {
    // Retrieve all appointments from the database
    const appointments = await getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve appointments" });
  }
};

// Get an appointment by ID
export const getAppointmentByIdController = async (req: Request, res: Response) => {
  const appointmentId = req.params.id; // Assuming the ID is passed as a route parameter
  try {
    // Retrieve the appointment by ID
    const appointment = await getAppointmentById(parseInt(appointmentId));
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve appointment" });
  }
};

// Update an appointment
export const updateAppointmentController = async (req: Request, res: Response) => {
  const appointmentId = req.params.id;  // Extract the appointment ID from request params
  try {
    // Validate and parse the update data
    const parsed = await validateAndParse(UpdateAppointmentSchema, req);

    // Update the appointment in the database
    const updatedAppointment = await updateAppointment(parseInt(appointmentId), parsed);

    // If the appointment was not found, return 404
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Return the updated appointment
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update appointment" });
  }
};

// Delete an appointment
export const deleteAppointmentController = async (req: Request, res: Response) => {
  const appointmentId = req.params.id;  // Extract the appointment ID from request params
  try {
    // Delete the appointment by ID
    const deleted = await deleteAppointment(parseInt(appointmentId));

    // If no appointment was deleted (not found), return 404
    if (!deleted) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Return a no-content response (204)
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
};
