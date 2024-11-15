import { z } from "zod";

// Schema for creating a new donor
export const NewDonorSchema = z
  .object({
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
    .openapi({ example: "1990-05-22T00:00:00.000Z" }), // Donor's birth date 
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
    bloodType: z.string().openapi({ example: "A+" }),
    medicalHistory: z.string().optional().openapi({ example: "None" }),
    collectorId: z.number().optional().openapi({ example: 2 }),
    systemAdminId: z.number().optional().openapi({ example: 1 })
  })
  .openapi("New Donor");

// Schema for a donor
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
    .openapi({ example: "1990-05-22T00:00:00.000Z" }), // Donor's birth date  
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
    bloodType: z.string().openapi({ example: "A+" }),
    medicalHistory: z.string().optional().openapi({ example: "None" }),
    collectorId: z.number().optional().openapi({ example: 2 }),
    systemAdminId: z.number().optional().openapi({ example: 1 }),
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" })
  })
  .openapi("Donor");

// Schema for updating a donor
export const UpdateDonorSchema = z
  .object({
    firstName: z.string().optional().openapi({ example: "John" }),
    middleName: z.string().optional().openapi({ example: "A." }),
    lastName: z.string().optional().openapi({ example: "Doe" }),
    title: z.string().optional().openapi({ example: "Mr." }),
    birthDate: z
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
  .openapi({ example: "1990-05-22T00:00:00.000Z" }), // Optional: Donor's birth date

    age: z.number().optional().openapi({ example: 33 }),
    gender: z.string().optional().openapi({ example: "Male" }),
    occupation: z.string().optional().openapi({ example: "Engineer" }),
    city: z.string().optional().openapi({ example: "New York" }),
    subCity: z.string().optional().openapi({ example: "Manhattan" }),
    zone: z.string().optional().openapi({ example: "Central" }),
    woreda: z.string().optional().openapi({ example: "5" }),
    kebele: z.string().optional().openapi({ example: "12" }),
    telephone: z.string().optional().openapi({ example: "123-456-7890" }),
    cellPhone: z.string().optional().openapi({ example: "987-654-3210" }),
    organization: z.string().optional().openapi({ example: "Tech Corp" }),
    email: z.string().email().optional().openapi({ example: "johndoe@example.com" }),
    password: z.string().optional().openapi({ example: "securePassword123" }),
    username: z.string().optional().openapi({ example: "john_doe" }),
    poBox: z.string().optional().openapi({ example: "P.O. Box 456" }),
    bloodType: z.string().optional().openapi({ example: "A+" }),
    medicalHistory: z.string().optional().openapi({ example: "None" }),
    collectorId: z.number().optional().openapi({ example: 2 }),
    systemAdminId: z.number().optional().openapi({ example: 1 })
  })
  .openapi("Update Donor");
