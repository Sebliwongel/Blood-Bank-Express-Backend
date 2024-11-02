import { z } from "zod";

export const NewDonorSchema = z
  .object({
    userId: z.number().openapi({ example: 1 }),
    bloodType: z.string().openapi({ example: "A+" }),
  })
  .openapi("New Donor");

export const DonorSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    userId: z.number().openapi({ example: 1 }),
    bloodType: z.string().openapi({ example: "A+" }),
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
  })
  .openapi("Donor");
