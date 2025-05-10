import { z } from "zod";

// Schema for creating a new appointment
export const NewAppointmentSchema = z
  .object({
    appointmentDate: z
      .string()
      // .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      //   message: "Invalid date format",
      // })
      .openapi({ example: "2023-07-15" }), // Date of appointment as string

    status: z.string().openapi({ example: "Scheduled" }), // Status of the appointment

    donorId: z.number().openapi({ example: 1 }), // Reference to Donor ID

    location: z.string().openapi({ example: "Blood Donation Center, Room 101" }), // Location of the appointment

    appointmentTime: z
      .string()
      // .refine((timeStr) => {
      //   // Validate time format (e.g., HH:mm)
      //   const timePattern = /^([0-1]?\d|2[0-3]):[0-5]\d$/;
      //   return timePattern.test(timeStr);
      // }, {
      //   message: "Invalid time format",
      // })
      .openapi({ example: "10:00" }), // Appointment time as string
  })
  .openapi("NewAppointment");

// Schema for retrieving an appointment (including relation with Donor)
export const AppointmentSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),

    appointmentDate: z.string().openapi({ example: "2024-11-07" }), // String format for date

    status: z.string().openapi({ example: "Scheduled" }),

    donorId: z.number().openapi({ example: 1 }), // Reference to Donor ID

    location: z.string().openapi({ example: "Blood Donation Center, Room 101" }), // Location of the appointment

    appointmentTime: z.string().openapi({ example: "10:00" }), // Appointment time as string

    createdAt: z.string().openapi({ example: "2024-11-01T10:00:00.000Z" }),

    updatedAt: z.string().openapi({ example: "2024-11-01T10:00:00.000Z" }),
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
      }) // Keep as string
      .openapi({ example: "2023-07-15" }),

    // Optional: Status of the appointment
    status: z.string().optional().openapi({ example: "Rescheduled" }),

    // Optional: Donor ID reference
    donorId: z.number().optional().openapi({ example: 2 }),

    // Optional: Location of the appointment
    location: z.string().optional().openapi({ example: "Blood Donation Center, Room 102" }),

    // Optional: Appointment time
    appointmentTime: z
      .string()
      .optional()
      .refine((timeStr) => {
        if (timeStr) {
          // Validate time format (e.g., HH:mm)
          const timePattern = /^([0-1]?\d|2[0-3]):[0-5]\d$/;
          return timePattern.test(timeStr);
        }
        return true;
      }, {
        message: "Invalid time format",
      }) // Keep as string
      .openapi({ example: "10:00" }),
  })
  .openapi("UpdateAppointment");
