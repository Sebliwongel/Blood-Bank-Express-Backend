import { z } from "zod";

// Schema for creating a new account
export const NewAccountSchema = z
  .object({
    userId: z.number().openapi({ example: 1 }),
    accountType: z.string().openapi({ example: "basic" }),
    accountStatus: z.string().openapi({ example: "active" }),
    hospitalId: z.number().optional().openapi({ example: 1 }), // Optional field for hospitalId
    donorId: z.number().optional().openapi({ example: 1 }),
  })
  .openapi("New Account");

// Schema for the Account model, including relations with Donor and Hospital
export const AccountSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    userId: z.number().openapi({ example: 1 }),
    accountType: z.string().openapi({ example: "basic" }),
    accountStatus: z.string().openapi({ example: "active" }),
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    isActive: z.boolean().openapi({ example: true }),
    activationDate: z.date().optional().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    deactivationDate: z.date().optional().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    hospitalId: z.number().optional().openapi({ example: 1 }), // Optional field for hospitalId
    hospital: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }).optional(),
    donorId: z.number().optional().openapi({ example: 1 }), // Optional field for donorId
    donor: z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
    }).optional(),
  })
  .openapi("Account");

// Schema for updating an account, allowing partial updates
export const UpdateAccountSchema = z
  .object({
    userId: z.number().optional().openapi({ example: 1 }),
    accountType: z.string().optional().openapi({ example: "premium" }),
    accountStatus: z.string().optional().openapi({ example: "inactive" }),
    isActive: z.boolean().optional().openapi({ example: true }),
    activationDate: z.date().optional().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    deactivationDate: z.date().optional().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    hospitalId: z.number().optional().openapi({ example: 1 }),
    donorId: z.number().optional().openapi({ example: 1 }),
  })
  .openapi("Update Account");
