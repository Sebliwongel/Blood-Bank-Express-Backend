import { z } from "zod";

// Order Schema
export const OrderSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    orderDate: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    bloodType: z.string().openapi({ example: "A+" }),
    quantity: z.number().openapi({ example: 3 }),
    status: z.string().openapi({ example: "Pending" }),
    hospitalId: z.number().openapi({ example: 1 }),
  })
  .openapi("Order");

// New Order Schema (for creating a new order)
export const NewOrderSchema = z
  .object({
    orderDate: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    bloodType: z.string().openapi({ example: "A+" }),
    quantity: z.number().openapi({ example: 3 }),
    status: z.string().openapi({ example: "Pending" }),
    hospitalId: z.number().openapi({ example: 1 }),
  })
  .openapi("New Order");

// Update Order Schema (for updating order information)
export const UpdateOrderSchema = z
  .object({
    orderDate: z.date().optional().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    bloodType: z.string().optional().openapi({ example: "A+" }),
    quantity: z.number().optional().openapi({ example: 3 }),
    status: z.string().optional().openapi({ example: "Pending" }),
    hospitalId: z.number().optional().openapi({ example: 1 }),
  })
  .openapi("Update Order");
