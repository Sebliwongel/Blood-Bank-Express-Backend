import { z } from "zod";

// Schema for creating a new donor
export const NewDonorSchema = z
  .object({
    firstName: z.string().openapi({ example: "John" }),
    middleName: z.string().optional().openapi({ example: "A." }), // Optional field
    lastName: z.string().openapi({ example: "Doe" }),
    title: z.string().optional().openapi({ example: "Mr." }), // Optional field
    birthDate: z.string().openapi({ example: "1990-01-01" }),
    age: z.number().openapi({ example: 33 }),
    gender: z.string().openapi({ example: "Male" }),
    occupation: z.string().optional().openapi({ example: "Engineer" }), // Optional field
    city: z.string().openapi({ example: "New York" }),
    subCity: z.string().openapi({ example: "Manhattan" }),
    zone: z.string().openapi({ example: "Central" }),
    woreda: z.string().openapi({ example: "5" }),
    kebele: z.string().openapi({ example: "12" }),
    telephone: z.string().optional().openapi({ example: "123-456-7890" }), // Optional field
    cellPhone: z.string().optional().openapi({ example: "987-654-3210" }), // Optional field
    organization: z.string().optional().openapi({ example: "Tech Corp" }), // Optional field
    email: z.string().email().openapi({ example: "johndoe@example.com" }),
    password: z.string().openapi({ example: "securePassword123" }),
    username: z.string().openapi({ example: "john_doe" }),
    poBox: z.string().optional().openapi({ example: "P.O. Box 456" }), // Optional field
    bloodType: z.string().openapi({ example: "A+" }),
    medicalHistory: z.string().optional().openapi({ example: "None" }), // Optional field
    collectorId: z.number().optional().openapi({ example: 2 }), // Optional field
    systemAdminId: z.number().optional().openapi({ example: 1 }) // Optional field
  })
  .openapi("New Donor");

// Schema for a donor
export const DonorSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    firstName: z.string().openapi({ example: "John" }),
    middleName: z.string().optional().openapi({ example: "A." }), // Optional field
    lastName: z.string().openapi({ example: "Doe" }),
    title: z.string().optional().openapi({ example: "Mr." }), // Optional field
    birthDate: z.string().openapi({ example: "1990-01-01" }),
    age: z.number().openapi({ example: 33 }),
    gender: z.string().openapi({ example: "Male" }),
    occupation: z.string().optional().openapi({ example: "Engineer" }), // Optional field
    city: z.string().openapi({ example: "New York" }),
    subCity: z.string().openapi({ example: "Manhattan" }),
    zone: z.string().openapi({ example: "Central" }),
    woreda: z.string().openapi({ example: "5" }),
    kebele: z.string().openapi({ example: "12" }),
    telephone: z.string().optional().openapi({ example: "123-456-7890" }), // Optional field
    cellPhone: z.string().optional().openapi({ example: "987-654-3210" }), // Optional field
    organization: z.string().optional().openapi({ example: "Tech Corp" }), // Optional field
    email: z.string().email().openapi({ example: "johndoe@example.com" }),
    password: z.string().openapi({ example: "securePassword123" }),
    username: z.string().openapi({ example: "john_doe" }),
    poBox: z.string().optional().openapi({ example: "P.O. Box 456" }), // Optional field
    bloodType: z.string().openapi({ example: "A+" }),
    medicalHistory: z.string().optional().openapi({ example: "None" }), // Optional field
    collectorId: z.number().optional().openapi({ example: 2 }), // Optional field
    systemAdminId: z.number().optional().openapi({ example: 1 }), // Optional field
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" })
  })
  .openapi("Donor");

// Schema for updating a donor
export const UpdateDonorSchema = z
  .object({
    firstName: z.string().optional().openapi({ example: "John" }),
    middleName: z.string().optional().openapi({ example: "A." }), // Optional field
    lastName: z.string().optional().openapi({ example: "Doe" }),
    title: z.string().optional().openapi({ example: "Mr." }), // Optional field
    birthDate: z.string().optional().openapi({ example: "1990-01-01" }),
    age: z.number().optional().openapi({ example: 33 }),
    gender: z.string().optional().openapi({ example: "Male" }),
    occupation: z.string().optional().openapi({ example: "Engineer" }), // Optional field
    city: z.string().optional().openapi({ example: "New York" }),
    subCity: z.string().optional().openapi({ example: "Manhattan" }),
    zone: z.string().optional().openapi({ example: "Central" }),
    woreda: z.string().optional().openapi({ example: "5" }),
    kebele: z.string().optional().openapi({ example: "12" }),
    telephone: z.string().optional().openapi({ example: "123-456-7890" }), // Optional field
    cellPhone: z.string().optional().openapi({ example: "987-654-3210" }), // Optional field
    organization: z.string().optional().openapi({ example: "Tech Corp" }), // Optional field
    email: z.string().email().optional().openapi({ example: "johndoe@example.com" }),
    password: z.string().optional().openapi({ example: "securePassword123" }),
    username: z.string().optional().openapi({ example: "john_doe" }),
    poBox: z.string().optional().openapi({ example: "P.O. Box 456" }), // Optional field
    bloodType: z.string().optional().openapi({ example: "A+" }),
    medicalHistory: z.string().optional().openapi({ example: "None" }), // Optional field
    collectorId: z.number().optional().openapi({ example: 2 }), // Optional field
    systemAdminId: z.number().optional().openapi({ example: 1 }) // Optional field
  })
  .openapi("Update Donor");
