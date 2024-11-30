import { z } from "zod";

// Schema for creating a new donors
export const NewDonorSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .openapi({ example: "John" }),
  middleName: z.string().nullable().optional().openapi({ example: null }),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .openapi({ example: "Doe" }),
  title: z.string().nullable().optional().openapi({ example: "Mr." }),
  birthDate: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Using ISO 8601 string format for dates
  age: z.number().int().positive().openapi({ example: 33 }),
  gender: z.string().min(1, "Gender is required").openapi({ example: "Male" }),
  occupation: z
    .string()
    .nullable()
    .optional()
    .openapi({ example: "Software Engineer" }),
  city: z
    .string()
    .min(1, "City is required")
    .openapi({ example: "Addis Ababa" }),
  subCity: z
    .string()
    .min(1, "Sub-city is required")
    .openapi({ example: "Bole" }),
  zone: z.string().min(1, "Zone is required").openapi({ example: "Zone 3" }),
  woreda: z
    .string()
    .min(1, "Woreda is required")
    .openapi({ example: "Woreda 11" }),
  kebele: z
    .string()
    .min(1, "Kebele is required")
    .openapi({ example: "Kebele 04" }),
  telephone: z.string().nullable().optional().openapi({ example: null }),
  cellPhone: z
    .string()
    .nullable()
    .optional()
    .openapi({ example: "0912345678" }),
  organization: z
    .string()
    .nullable()
    .optional()
    .openapi({ example: "Red Cross" }),
  email: z
    .string()
    .email("Invalid email format")
    .openapi({ example: "john.doe@example.com" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .openapi({ example: "strongPassword123" }),
  username: z
    .string()
    .min(1, "Username is required")
    .openapi({ example: "john_doe" }),
  poBox: z.string().nullable().optional().openapi({ example: null }),
});

export const DonorSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    firstName: z.string().openapi({ example: "John" }),
    middleName: z.string().optional().openapi({ example: "A." }),
    lastName: z.string().openapi({ example: "Doe" }),
    title: z.string().optional().openapi({ example: "Mr." }),
    birthDate: z
      .string()
      .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
        message: "Invalid date format",
      })
      .transform((dateStr) => new Date(dateStr))
      .openapi({ example: "1990-05-22T00:00:00.000Z" }),
    age: z.number().openapi({ example: 33 }),
    gender: z.string().openapi({ example: "Male" }),
    occupation: z.string().optional().openapi({ example: "Engineer" }),
    city: z.string().openapi({ example: "New York" }),
    subCity: z.string().openapi({ example: "Manhattan" }),
    zone: z.string().openapi({ example: "Central" }),
    woreda: z.string().openapi({ example: "5" }),
    kebele: z.string().openapi({ example: "12" }),
    telephone: z.string().optional().openapi({ example: "123-456-7890" }),
    cellPhone: z.string().optional().openapi({ example: "987-654-3210" }),
    organization: z.string().optional().openapi({ example: "Tech Corp" }),
    email: z.string().email().openapi({ example: "johndoe@example.com" }),
    password: z.string().openapi({ example: "securePassword123" }),
    username: z.string().openapi({ example: "john_doe" }),
    poBox: z.string().optional().openapi({ example: "P.O. Box 456" }),
    createdAt: z
      .string()
      .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
        message: "Invalid date format",
      })
      .transform((dateStr) => new Date(dateStr))
      .openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z
      .string()
      .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
        message: "Invalid date format",
      })
      .transform((dateStr) => new Date(dateStr))
      .openapi({ example: "2023-07-15T10:00:00.000Z" }),
  })
  .openapi("Donor");

// Schema for updating an existing donor
export const UpdateDonorSchema = z.object({
  firstName: z.string().min(1).optional(),
  middleName: z.string().nullable().optional(),
  lastName: z.string().min(1).optional(),
  title: z.string().nullable().optional(),
  birthDate: z
    .string()
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    })
    .transform((dateStr) => new Date(dateStr))
    .openapi({ example: "1990-05-22T00:00:00.000Z" }),
  age: z.number().int().positive().optional(),
  gender: z.string().optional(),
  occupation: z.string().nullable().optional(),
  city: z.string().optional(),
  subCity: z.string().optional(),
  zone: z.string().optional(),
  woreda: z.string().optional(),
  kebele: z.string().optional(),
  telephone: z.string().nullable().optional(),
  cellPhone: z.string().nullable().optional(),
  organization: z.string().nullable().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  username: z.string().optional(),
  poBox: z.string().nullable().optional(),
});

// TypeScript types for use in services or controllers
export type NewDonorType = z.infer<typeof NewDonorSchema>;
export type UpdateDonorType = z.infer<typeof UpdateDonorSchema>;
