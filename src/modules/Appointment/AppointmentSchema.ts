import { z } from "zod";
//import { DonorSchema } from "../donor/donorSchema";

// Schema for creating a new appointment


// id              Int       @id @default(autoincrement())
// appointmentDate DateTime
// status          String
// donorId         Int
// donor   
export const NewAppointmentSchema = z
  .object({
    appointmentDate: z
      .string()
      .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
        message: "Invalid date format",
      })
      .transform((dateStr) => new Date(dateStr))
      .openapi({ example: "2023-07-15T10:00:00.000Z" }), // Date of donation

    status: z.string().openapi({ example: "Scheduled" }), // Status of the appointment

    donorId: z.number().openapi({ example: 1 }), // Reference to Donor ID
  })
  .openapi("NewAppointment");

// Schema for retrieving an appointment (including relation with Donor)
export const AppointmentSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    appointmentDate: z.date().openapi({ example: "2024-11-07T10:00:00.000Z" }),
    status: z.string().openapi({ example: "Scheduled" }),
    donorId: z.number().openapi({ example: 1 }), // Reference to Donor ID
    //donor: DonorSchema, // You can include the Donor schema here if needed
    createdAt: z.date().openapi({ example: "2024-11-01T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2024-11-01T10:00:00.000Z" }),
  })
  .openapi("Appointment");

// Schema for updating an appointment

export const UpdateAppointmentSchema = z
  .object({
    // Optional: Appointment date
    appointmentDate: z
      .string()
      .optional()
      .refine((dateStr) => {
        // Only validate if the date string is provided
        if (dateStr) {
          return !isNaN(Date.parse(dateStr));
        }
        return true; // If no date is provided, it's valid
      }, {
        message: "Invalid date format",
      })
      .transform((dateStr) => (dateStr ? new Date(dateStr) : undefined)) // Transform to Date object or undefined
      .openapi({ example: "2023-07-15T10:00:00.000Z" }),

    // Optional: Status of the appointment
    status: z.string().optional().openapi({ example: "Rescheduled" }),

    // Optional: Donor ID reference
    donorId: z.number().optional().openapi({ example: 2 }),
  })
  .openapi("UpdateAppointment");



