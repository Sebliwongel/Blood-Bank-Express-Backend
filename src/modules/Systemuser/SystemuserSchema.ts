import { z } from "zod";

// Enum for User Roles to match your Prisma UserRole type (assuming a basic Enum for this example)
export const UserRoleEnum = z.enum(["ADMIN", "COLLECTOR", "SYSTEM_ADMIN"]);

// Schema for creating a new system user
export const NewSystemUserSchema = z
  .object({
    name: z.string().min(1).max(255).openapi({ example: "John Doe" }),
    email: z.string().email().openapi({ example: "johndoe@example.com" }),
    role: UserRoleEnum.openapi({ example: "ADMIN" }),
    password: z.string().min(8).max(255).openapi({ example: "securePassword123" }),
  })
  .openapi("New System User");

// Schema for the full system user (with ID, createdAt, and updatedAt)
export const SystemUserSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().min(1).max(255).openapi({ example: "John Doe" }),
    email: z.string().email().openapi({ example: "johndoe@example.com" }),
    role: UserRoleEnum.openapi({ example: "ADMIN" }),
    password: z.string().min(8).max(255).openapi({ example: "securePassword123" }),
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
  })
  .openapi("System User");

// Schema for updating a system user (optional fields)
export const UpdateSystemUserSchema = z
  .object({
    name: z.string().min(1).max(255).optional().openapi({ example: "John Doe" }),
    email: z.string().email().optional().openapi({ example: "johndoe@example.com" }),
    role: UserRoleEnum.optional().openapi({ example: "COLLECTOR" }),
    password: z.string().min(8).max(255).optional().openapi({ example: "newPassword123" }),
  })
  .openapi("Update System User");
