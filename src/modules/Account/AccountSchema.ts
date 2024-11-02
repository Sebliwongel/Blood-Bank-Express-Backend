import { z } from "zod";

export const NewAccountSchema = z
  .object({
    userId: z.number().openapi({ example: 1 }),
    accountType: z.string().openapi({ example: "basic" }),
    accountStatus: z.string().openapi({ example: "active" }),
  })
  .openapi("New Account");

export const AccountSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    userId: z.number().openapi({ example: 1 }),
    accountType: z.string().openapi({ example: "basic" }),
    accountStatus: z.string().openapi({ example: "active" }),
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
  })
  .openapi("Account");

export const UpdateAccountSchema = z
  .object({
    userId: z.number().optional().openapi({ example: 1 }), // Optional field
    accountType: z.string().optional().openapi({ example: "premium" }), // Optional field
    accountStatus: z.string().optional().openapi({ example: "inactive" }), // Optional field
  })
  .openapi("Update Account");
