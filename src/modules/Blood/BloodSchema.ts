import { z } from "zod";

// Schema for creating a new blood record
export const NewBloodSchema = z
  .object({
    bloodType: z.string().openapi({ example: "A+" }), // Blood type (e.g., A+, B-, O+)
    quantity: z.number().min(0).openapi({ example: 500 }), // Quantity in milliliters or units
    donationDate: z
      .string()
      .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
        message: "Invalid date format",
      })
      .transform((dateStr) => new Date(dateStr))
      .openapi({ example: "2023-07-15T10:00:00.000Z" }),// Date of donation
  })
  .openapi("New Blood");
  

// Schema for a blood record with full details
export const BloodSchema = z
  .object({
    id: z.number().openapi({ example: 1 }), // ID of the blood record
    bloodType: z.string().openapi({ example: "A+" }), // Blood type (e.g., A+, B-, O+)
    quantity: z.number().min(0).openapi({ example: 500 }), // Quantity available in milliliters or units
    donationDate: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Date when blood was donated
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Timestamp when blood record was created
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Timestamp when blood record was last updated
  })
  .openapi("Blood");

// Schema for updating a blood record
export const UpdateBloodSchema = z
  .object({
    bloodType: z.string().optional().openapi({ example: "A+" }), // Optional: Blood type
    quantity: z.number().min(0).optional().openapi({ example: 500 }), // Optional: Blood quantity
    // Optional: Date of donation
    donationDate: z
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
      .transform((dateStr) => dateStr ? new Date(dateStr) : undefined) // Transform to Date object or undefined
      .openapi({ example: "2023-07-15T10:00:00.000Z" }), // Optional: Date of donation
  })
