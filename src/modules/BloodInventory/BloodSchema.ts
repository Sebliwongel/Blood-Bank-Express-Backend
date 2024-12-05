import { z } from "zod";
import dateSchema from "../../utils/commonSchema";

export const NewBloodSchema = z.object({
  bloodType: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).openapi({
    example: "A+",
  }),
  quantity: z.number().min(1).openapi({ example: 500 }),
  barcode: z.string().openapi({ example: "1234567890" }),
  donationDate: z
    .string()
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    })
    .transform((dateStr) => new Date(dateStr))
    .openapi({ example: "2023-07-15T10:00:00.000Z" }),
  expirationDate: z
    .string()
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid date format",
    })
    .transform((dateStr) => new Date(dateStr))
    .openapi({ example: "2023-08-15T10:00:00.000Z" }),
  storageStatus: z
    .enum(["AVAILABLE", "RESERVED", "EXPIRED", "USED"])
    .openapi({ example: "AVAILABLE" }),
  donorId: z.number().openapi({ example: 1 }),
});

export const BloodSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).openapi({
    example: "A+",
  }),
  quantity: z.number().min(1).openapi({ example: 500 }),
  barcode: z.string().openapi({ example: "1234567890" }),
  donationDate: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
  expirationDate: z.date().openapi({ example: "2023-08-15T10:00:00.000Z" }),
  storageStatus: z
    .enum(["AVAILABLE", "RESERVED", "EXPIRED", "USED"])
    .openapi({ example: "AVAILABLE" }),
  donorId: z.number().openapi({ example: 1 }),
  createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
  updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
});

// Schema for updating a blood record
export const UpdateBloodSchema = z.object({
  bloodType: z
    .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
    .optional()
    .openapi({ example: "A+" }),
  quantity: z.number().min(1).optional().openapi({ example: 500 }),
  barcode: z.string().openapi({ example: "1234567890" }),
  donationDate: dateSchema.optional(),
  expirationDate: dateSchema.optional(),
  storageStatus: z
    .enum(["AVAILABLE", "RESERVED", "EXPIRED", "USED"])
    .optional()
    .openapi({ example: "AVAILABLE" }),
});
