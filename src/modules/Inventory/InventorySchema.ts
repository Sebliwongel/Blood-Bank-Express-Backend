import { z } from "zod";

// Schema for creating a new inventory record (POST request)
export const NewInventorySchema = z.object({
  name: z.string().openapi({ example: "Blood Pack A+" }), // Name of the inventory item
  bloodType: z.string().openapi({ example: "A+" }), // Blood type (e.g., A+, B-, O+)
  expirationDate: z.date().openapi({ example: "2025-12-31T23:59:59Z" }), // Expiration date of the blood
  totalQuantity: z.number().openapi({ example: 1000 }), // Total quantity of the blood type in milliliters
  bloodId: z.number().openapi({ example: 1 }), // Blood ID (foreign key to Blood model)
}).openapi("New Inventory");

// Schema for retrieving and displaying an inventory record (GET request)
export const InventorySchema = z.object({
  id: z.number().openapi({ example: 1 }), // Inventory ID
  name: z.string().openapi({ example: "Blood Pack A+" }), // Name of the inventory item
  bloodType: z.string().openapi({ example: "A+" }), // Blood type
  expirationDate: z.date().openapi({ example: "2025-12-31T23:59:59Z" }), // Expiration date
  totalQuantity: z.number().openapi({ example: 1000 }), // Total quantity
  createdAt: z.date().openapi({ example: "2024-11-05T10:00:00.000Z" }), // Timestamp when created
  updatedAt: z.date().openapi({ example: "2024-11-05T10:00:00.000Z" }), // Timestamp when updated
  bloodId: z.number().openapi({ example: 1 }), // Foreign key to the Blood model
  blood: z.object({
    id: z.number().openapi({ example: 1 }), // Blood record ID
    bloodType: z.string().openapi({ example: "A+" }), // Blood type
    quantity: z.number().openapi({ example: 500 }), // Quantity of blood in the record
    donationDate: z.date().openapi({ example: "2024-10-10T00:00:00Z" }), // Donation date
  }).openapi("Blood"), // Blood information
}).openapi("Inventory");

// Schema for updating an existing inventory record (PATCH request)
export const UpdateInventorySchema = z.object({
  name: z.string().optional().openapi({ example: "Blood Pack A+" }), // Optional name field
  bloodType: z.string().optional().openapi({ example: "A+" }), // Optional blood type field
  expirationDate: z.date().optional().openapi({ example: "2025-12-31T23:59:59Z" }), // Optional expiration date
  totalQuantity: z.number().optional().openapi({ example: 1000 }), // Optional quantity field
}).openapi("Update Inventory");

