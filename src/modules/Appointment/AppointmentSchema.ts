import { z } from "zod";
import { DonorSchema } from "../donor/donorSchema";

// Schema for creating a new appointment
export const NewAppointmentSchema = z
  .object({
    appointmentDate: z.date().openapi({ example: "2024-11-07T10:00:00.000Z" }),
    status: z.string().openapi({ example: "Scheduled" }),
    donorId: z.number().openapi({ example: 1 }), // Reference to Donor ID
  })
  .openapi("New Appointment");

// Schema for retrieving an appointment (including relation with Donor)
export const AppointmentSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    appointmentDate: z.date().openapi({ example: "2024-11-07T10:00:00.000Z" }),
    status: z.string().openapi({ example: "Scheduled" }),
    donorId: z.number().openapi({ example: 1 }), // Reference to Donor ID
    donor: DonorSchema, // You can include the Donor schema here if needed
    createdAt: z.date().openapi({ example: "2024-11-01T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2024-11-01T10:00:00.000Z" }),
  })
  .openapi("Appointment");

// Schema for updating an appointment
export const UpdateAppointmentSchema = z
  .object({
    appointmentDate: z.date().optional().openapi({ example: "2024-11-07T10:00:00.000Z" }),
    status: z.string().optional().openapi({ example: "Completed" }),
    donorId: z.number().optional().openapi({ example: 1 }), // Optional, as it may not be updated
  })
  .openapi("Update Appointment");

