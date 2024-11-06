import { z } from "zod";

// New System Admin schema (for creating a new admin)
export const NewSystemAdminSchema = z
  .object({
    username: z.string().min(1).openapi({ example: "admin_user" }), // Username is required
  })
  .openapi("New System Admin");

// System Admin schema (for retrieving admin details)
export const SystemAdminSchema = z
  .object({
    id: z.number().openapi({ example: 1 }), // Unique identifier for the system admin
    username: z.string().openapi({ example: "admin_user" }), // Username of the system admin
    accounts: z.array(z.object({ // Array of associated accounts
      id: z.number().openapi({ example: 1 }),
      userId: z.number().openapi({ example: 1 }),
      accountType: z.string().openapi({ example: "basic" }),
      accountStatus: z.string().openapi({ example: "active" }),
      createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
      updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    })).openapi("SystemAdmin Accounts"), 
    notifications: z.array(z.object({ // Array of notifications associated with the admin
      id: z.number().openapi({ example: 1 }),
      message: z.string().openapi({ example: "New account created." }),
      createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    })).openapi("SystemAdmin Notifications"),
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
  })
  .openapi("System Admin");

// Update System Admin schema (for updating an existing admin)
export const UpdateSystemAdminSchema = z
  .object({
    username: z.string().optional().openapi({ example: "new_admin_user" }), // Optional field for updating username
  })
  .openapi("Update System Admin");
