import { z } from "zod";

// Zod schema to validate the creation of a new integration
export const NewIntegrationSchema = z
  .object({
    hospitalId: z.number().openapi({ example: 1 }),
  })
  .openapi("New Integration");

// Zod schema to represent the full integration object, including related blood inventories
export const IntegrationSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    hospitalId: z.number().openapi({ example: 1 }),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).openapi({ example: "PENDING" }), // Enum for the integration status
    managerId: z.number().optional().openapi({ example: 1 }), // Optional field for the manager
    managerComment: z.string().optional().openapi({ example: "Request approved" }), // Optional field for manager comments
    createdAt: z.string().datetime().openapi({ example: "2024-12-01T12:00:00Z" }), // ISO string for datetime
    updatedAt: z.string().datetime().openapi({ example: "2024-12-01T12:00:00Z" }), // ISO string for datetime
    bloodInventories: z
      .array(
        z.object({
          id: z.number().openapi({ example: 1 }),
          bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).openapi({ example: "A+" }),
          quantity: z.number().openapi({ example: 5 }),
          barcode: z.string().openapi({ example: "1234567890" }),
          donationDate: z.string().datetime().openapi({ example: "2024-11-25T10:00:00Z" }),
          expirationDate: z.string().datetime().openapi({ example: "2024-12-25T10:00:00Z" }),
        })
      )
      .optional()
      .openapi({ example: [{ id: 1, bloodType: "A+", quantity: 5, barcode: "1234567890", donationDate: "2024-11-25T10:00:00Z", expirationDate: "2024-12-25T10:00:00Z" }] }), // Example blood inventory items
  })
  .openapi("Integration");

// Zod schema for updating an integration
export const UpdateIntegrationSchema = z
  .object({
    hospitalId: z.number().optional().openapi({ example: 1 }), // Optional update for hospitalId
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional().openapi({ example: "APPROVED" }), // Optional status update
    managerComment: z.string().optional().openapi({ example: "Request approved after review" }), // Optional manager comment update
  })
  .openapi("Update Integration");

