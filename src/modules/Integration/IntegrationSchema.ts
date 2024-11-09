import { z } from "zod";

export const NewIntegrationSchema = z
  .object({
    hospitalId: z.number().openapi({ example: 1 }),
  })
  .openapi("New Integration");

export const IntegrationSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    hospitalId: z.number().openapi({ example: 1 }),
    inventories: z
      .array(
        z.object({
          id: z.number().openapi({ example: 1 }),
          // Define other fields of Inventory schema as needed
        })
      )
      .optional() // Optional in case no inventories are included
      .openapi({ example: [{ id: 1 }] }),
  })
  .openapi("Integration");

export const UpdateIntegrationSchema = z
  .object({
    hospitalId: z.number().optional().openapi({ example: 1 }), // Optional field
  })
  .openapi("Update Integration");
