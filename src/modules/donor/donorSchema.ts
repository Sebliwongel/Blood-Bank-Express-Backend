import { z } from "zod";

// Schema for creating a new donor
export const NewDonorSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .openapi({ example: "John" }),
  middleName: z
    .string()
    .nullable()
    .optional()
    .openapi({ example: null }),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .openapi({ example: "Doe" }),
  title: z
    .string()
    .nullable()
    .optional()
    .openapi({ example: "Mr." }),
  birthDate: z
    .date()
    .openapi({ example: "1990-05-22T00:00:00.000Z" }),
  gender: z
    .string()
    .min(1, "Gender is required")
    .openapi({ example: "Male" }),
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
  woreda: z
    .string()
    .min(1, "Woreda is required")
    .openapi({ example: "Woreda 11" }),
  kebele: z
    .string()
    .min(1, "Kebele is required")
    .openapi({ example: "Kebele 04" }),
  PhoneNumber: z
    .string()
    .nullable()
    .optional()
    .openapi({ example: "0912345678" }),
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
});

// Schema for a single donor (includes all fields, including createdAt/updatedAt)
export const DonorSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  firstName: z.string().openapi({ example: "John" }),
  middleName: z.string().nullable().optional().openapi({ example: null }),
  lastName: z.string().openapi({ example: "Doe" }),
  title: z.string().nullable().optional().openapi({ example: "Mr." }),
  birthDate: z
    .string()
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    })
    .transform((dateStr) => new Date(dateStr))
    .openapi({ example: "1990-05-22T00:00:00.000Z" }),
  gender: z.string().openapi({ example: "Male" }),
  occupation: z.string().nullable().optional().openapi({ example: "Engineer" }),
  city: z.string().openapi({ example: "New York" }),
  subCity: z.string().openapi({ example: "Manhattan" }),
  woreda: z.string().openapi({ example: "5" }),
  kebele: z.string().openapi({ example: "12" }),
  PhoneNumber: z
    .string()
    .nullable()
    .optional()
    .openapi({ example: "0912345678" }),
  email: z.string().email().openapi({ example: "johndoe@example.com" }),
  password: z.string().openapi({ example: "securePassword123" }),
  username: z.string().openapi({ example: "john_doe" }),
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
});

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
    .optional(),
  gender: z.string().optional(),
  occupation: z.string().nullable().optional(),
  city: z.string().optional(),
  subCity: z.string().optional(),
  woreda: z.string().optional(),
  kebele: z.string().optional(),
  PhoneNumber: z.string().nullable().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  username: z.string().optional(),
});

// TypeScript types for services or controllers
export type NewDonorType = z.infer<typeof NewDonorSchema>;
export type DonorType = z.infer<typeof DonorSchema>;
export type UpdateDonorType = z.infer<typeof UpdateDonorSchema>;
