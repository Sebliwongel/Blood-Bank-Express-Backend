import { z } from "zod";

// Schema for creating a new blood inventory record
export const NewBloodSchema = z.object({
  donorId: z.number().openapi({ example: 1 }),
  bloodType: z
    .string()
    .default("UNKNOWN") // Provide a default value
    .openapi({ example: "O_POS" }),
  barcode: z
    .string()
    .min(1, "Barcode is required")
    .openapi({ example: "123456789" }),
  donationDate: z
    .string()
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    })
    .openapi({ example: "2023-12-15T10:00:00.000Z" }),
  expirationDate: z
    .string()
    .default("") // Provide a default value
    .refine((dateStr) => dateStr === "" || !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    })
    .openapi({ example: "2024-01-15T10:00:00.000Z" }),
  storageStatus: z
    .enum(["AVAILABLE", "RESERVED", "EXPIRED"])
    .default("AVAILABLE") // Provide a default value
    .openapi({ example: "AVAILABLE" }),
  quantityml: z
    .number()
    .min(1, "Quantity must be at least 1")
    .openapi({ example: 500 }),
  stockLevel: z
    .number()
    .default(0) // Provide a default value
    .openapi({ example: 10 }),
  hospitalId: z
    .number()
    .default(0) // Provide a default value
    .openapi({ example: 1 }),
  collectorId: z
    .number()
    .default(0) // Provide a default value
    .openapi({ example: 2 }),
});

// Schema for updating an existing blood inventory record
export const UpdateBloodSchema = z.object({
  donorId: z.number().optional(),
  bloodType: z.string().optional(),
  barcode: z.string().min(1).optional(),
  donationDate: z
    .string()
    .optional()
    .refine((dateStr) => dateStr === undefined || !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    }),
  expirationDate: z
    .string()
    .optional()
    .refine((dateStr) => dateStr === undefined || !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    }),
  storageStatus: z.enum(["AVAILABLE", "RESERVED", "EXPIRED"]).optional(),
  quantityml: z
    .number()
    .min(1, "Quantity must be at least 1")
    .optional()
    .openapi({ example: 500 }),
  stockLevel: z.number().optional(),
  hospitalId: z.number().optional(),
  collectorId: z.number().optional(),
});

// TypeScript types for services or controllers
export type NewBloodType = z.infer<typeof NewBloodSchema>;
export type UpdateBloodType = z.infer<typeof UpdateBloodSchema>;
