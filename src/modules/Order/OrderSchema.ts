import { z } from 'zod';

// Define the enums for validation
const OrderStatusEnum = z.enum(['PENDING', 'COMPLETED', 'CANCELED']);
const BloodTypeEnum = z.enum([
  'A_POS',
  'A_NEG',
  'B_POS',
  'B_NEG',
  'AB_POS',
  'AB_NEG',
  'O_POS',
  'O_NEG',
]);

// Schema for creating a new order
export const createOrderSchema = z.object({
  orderDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }), // Validate as a proper date
  bloodType: BloodTypeEnum,
  quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
  storageStatus: OrderStatusEnum,
  hospitalId: z.number().int().positive({ message: 'Invalid hospital ID' }),
});

// Schema for updating order status
export const updateOrderStatusSchema = z.object({
  status: OrderStatusEnum,
});

// Type definitions for TypeScript
export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusDTO = z.infer<typeof updateOrderStatusSchema>;
