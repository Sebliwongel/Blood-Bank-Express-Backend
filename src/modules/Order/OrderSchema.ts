import { z } from 'zod';

// Define enums
const OrderStatusEnum = z.enum(['PENDING', 'COMPLETED', 'CANCELED']);

// Schema for creating a new order
export const createOrderSchema = z.object({
  orderDate: z.string().refine((date) => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate);
  }, {
    message: 'Invalid date format. Expected format: YYYY-MM-DD or ISO 8601 string.',
  }),
  aPosAmount: z.number().int().nonnegative({ message: 'Must be a non-negative integer' }),
  aNegAmount: z.number().int().nonnegative({ message: 'Must be a non-negative integer' }),
  bPosAmount: z.number().int().nonnegative({ message: 'Must be a non-negative integer' }),
  bNegAmount: z.number().int().nonnegative({ message: 'Must be a non-negative integer' }),
  abPosAmount: z.number().int().nonnegative({ message: 'Must be a non-negative integer' }),
  abNegAmount: z.number().int().nonnegative({ message: 'Must be a non-negative integer' }),
  oPosAmount: z.number().int().nonnegative({ message: 'Must be a non-negative integer' }),
  oNegAmount: z.number().int().nonnegative({ message: 'Must be a non-negative integer' }),
  status: OrderStatusEnum,
  hospitalId: z.number().int().positive({ message: 'Invalid hospital ID' }),
});

// Schema for updating order status
export const updateOrderStatusSchema = z.object({
  status: OrderStatusEnum,
});

// Type definitions
export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusDTO = z.infer<typeof updateOrderStatusSchema>;
