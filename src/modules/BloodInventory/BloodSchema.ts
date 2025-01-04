import { z } from "zod";

// Schema for creating a new blood inventory record
export const NewBloodSchema = z.object({
  donorId: z.number().openapi({ example: 1 }),
  bloodType: z
    .string()
    .min(1, "Blood type is required")
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
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    })
    .openapi({ example: "2024-01-15T10:00:00.000Z" }),
  storageStatus: z
    .enum(["AVAILABLE", "RESERVED", "EXPIRED"])
    .openapi({ example: "AVAILABLE" }),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .openapi({ example: 5 }),
});

// Schema for updating an existing blood inventory record
export const UpdateBloodSchema = z.object({
  donorId: z.number().optional(),
  bloodType: z.string().min(1).optional(),
  barcode: z.string().min(1).optional(),
  donationDate: z
    .string()
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    })
    .optional(),
  expirationDate: z
    .string()
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    })
    .optional(),
  storageStatus: z.enum(["AVAILABLE", "RESERVED", "EXPIRED"]).optional(),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .optional()
    .openapi({ example: 5 }),
});

// TypeScript types for services or controllers
export type NewBloodType = z.infer<typeof NewBloodSchema>;
export type UpdateBloodType = z.infer<typeof UpdateBloodSchema>;
