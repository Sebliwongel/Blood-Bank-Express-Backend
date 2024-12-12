import { z } from "zod";

// ==========================
// Hospital Schema
// ==========================

// Schema for validating hospital IDs in routes
export const HospitalIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
}).openapi("Hospital ID");

// Schema for creating a new hospital
export const CreateHospitalSchema = z.object({
  name: z.string().min(1, "Hospital name is required").openapi({ example: "City Hospital" }),
  address: z.string().min(1, "Address is required").openapi({ example: "123 Main St, Cityville, State, 12345" }),
  username: z.string().min(1, "Username is required").openapi({ example: "city_hospital_admin" }),
  email: z.string().min(1, "Email is required").email("Invalid email address").openapi({ example: "city_hospital@example.com" }),
  password: z.string().min(6, "Password must be at least 6 characters long").openapi({ example: "securePassword123" }),
 }).openapi("Create Hospital");

// Schema for hospital responses (includes all fields including generated ones)
export const HospitalSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: "City Hospital" }),
  address: z.string().openapi({ example: "123 Main St, Cityville, State, 12345" }),
  username: z.string().openapi({ example: "city_hospital_admin" }),
  email: z.string().openapi({ example: "city_hospital@example.com" }),
  isActive: z.boolean().openapi({ example: true }),
  deactivatedAt: z.date().nullable().openapi({ example: null }),
  createdAt: z.date().openapi({ example: "2024-01-01T00:00:00Z" }),
  updatedAt: z.date().openapi({ example: "2024-01-01T00:00:00Z" }),
}).openapi("Hospital");

// Schema for updating an existing hospital
export const UpdateHospitalSchema = z.object({
  name: z.string().min(1, "Hospital name is required").optional().openapi({ example: "Updated City Hospital" }),
  address: z.string().min(1, "Address is required").optional().openapi({ example: "456 Main St, New City, New State, 67890" }),
  email: z.string().min(1, "Email is required").email("Invalid email address").optional().openapi({ example: "city_hospital@example.com" }),
  username: z.string().min(1, "Username is required").optional().openapi({ example: "updated_hospital_admin" }),
  password: z.string().min(6, "Password must be at least 6 characters long").optional().openapi({ example: "newPassword123" }),
  isActive: z.boolean().optional().openapi({ example: false }),
  deactivatedAt: z
    .string()
    .datetime({ message: "Invalid date format for deactivation" })
    .optional()
    .openapi({ example: "2024-12-01T15:30:00Z" }),
}).openapi("Update Hospital");
