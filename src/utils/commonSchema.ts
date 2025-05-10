import { z } from "zod";

const dateSchema = z
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
      .openapi({ example: "2023-07-15T10:00:00.000Z" }); // Optional: Date of donation

      export default dateSchema;