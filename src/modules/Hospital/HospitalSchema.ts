import { z } from "zod";

// Define the schema for creating a new hospital
export const NewHospitalSchema = z
  .object({
    name: z.string().openapi({ example: "City Hospital" }), // Name of the hospital
    address: z.string().openapi({ example: "123 Main St, Cityville" }), // Address of the hospital
    contactInfo: z.string().openapi({ example: "+1234567890" }), // Contact information for the hospital
    email: z.string().email().openapi({ example: "contact@cityhospital.com" }), // Email address (validated as an email)
    username: z.string().openapi({ example: "city_hospital_admin" }), // Admin username for hospital login
    password: z.string().openapi({ example: "securePassword123" }), // Password for hospital admin
  })
  .openapi("New Hospital");

// Define the schema for the hospital details (with related fields and timestamps)
export const HospitalSchema = z
  .object({
    id: z.number().openapi({ example: 1 }), // Unique identifier for the hospital
    name: z.string().openapi({ example: "City Hospital" }), // Name of the hospital
    address: z.string().openapi({ example: "123 Main St, Cityville" }), // Address of the hospital
    contactInfo: z.string().openapi({ example: "+1234567890" }), // Contact information for the hospital
    email: z.string().email().openapi({ example: "contact@cityhospital.com" }), // Email address (validated as an email)
    username: z.string().openapi({ example: "city_hospital_admin" }), // Admin username for hospital login
    password: z.string().openapi({ example: "securePassword123" }), // Password for hospital admin
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Date the hospital record was created
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Date the hospital record was last updated
  })
  .openapi("Hospital");

// Define the schema for updating hospital details (with optional fields)
export const UpdateHospitalSchema = z
  .object({
    name: z.string().optional().openapi({ example: "Central City Hospital" }), // Optional name change
    address: z.string().optional().openapi({ example: "456 Another St, Cityville" }), // Optional address change
    contactInfo: z.string().optional().openapi({ example: "+0987654321" }), // Optional contact information change
    email: z.string().email().optional().openapi({ example: "support@cityhospital.com" }), // Optional email change
    username: z.string().optional().openapi({ example: "new_city_hospital_admin" }), // Optional username change
    password: z.string().optional().openapi({ example: "newSecurePassword123" }), // Optional password change
  })
  .openapi("Update Hospital");
