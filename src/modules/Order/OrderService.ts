import { PrismaClient, OrderStatus } from '@prisma/client';
import { z } from 'zod';
import { createOrderSchema, updateOrderStatusSchema, CreateOrderDTO, UpdateOrderStatusDTO } from './OrderSchema'; // Adjust path as needed

const prisma = new PrismaClient();

class OrderService {
  /**
   * Create a new order after validating input data with Zod schema.
   * @param data - Data for the new order.
   * @returns The newly created order.
   */
  async createOrder(data: CreateOrderDTO) {
    try {
      // Validate input data
      const validatedData = createOrderSchema.parse(data);

      // Check if the hospital exists
      const hospitalExists = await prisma.hospital.findUnique({
        where: { id: validatedData.hospitalId },
      });

      if (!hospitalExists) {
        throw new Error(`Hospital with ID ${validatedData.hospitalId} does not exist.`);
      }

      // Create the order
      const newOrder = await prisma.order.create({
        data: {
          orderDate: validatedData.orderDate,
          aPosAmount: validatedData.aPosAmount,
          aNegAmount: validatedData.aNegAmount,
          bPosAmount: validatedData.bPosAmount,
          bNegAmount: validatedData.bNegAmount,
          abPosAmount: validatedData.abPosAmount,
          abNegAmount: validatedData.abNegAmount,
          oPosAmount: validatedData.oPosAmount,
          oNegAmount: validatedData.oNegAmount,
          status: validatedData.status,
          hospitalId: validatedData.hospitalId,
        },
      });

      return newOrder;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Validation Error: ${error.issues.map((issue) => issue.message).join(', ')}`);
      }
      if (error instanceof Error) {
        throw new Error(`Error creating order: ${error.message}`);
      }
      throw new Error('An unknown error occurred while creating the order.');
    }
  }

  /**
   * Retrieve all orders, optionally including related hospital details.
   * @returns A list of all orders.
   */
  async getAllOrders() {
    try {
      const orders = await prisma.order.findMany({
        include: { hospital: true }, // Include related hospital details
      });
      return orders;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching orders: ${error.message}`);
      }
      throw new Error('An unknown error occurred while fetching orders.');
    }
  }

  /**
   * Retrieve an order by its ID.
   * @param id - The ID of the order.
   * @returns The order if found.
   */
  async getOrderById(id: number) {
    try {
      const order = await prisma.order.findUnique({
        where: { id },
        include: { hospital: true }, // Include related hospital details
      });

      if (!order) {
        throw new Error(`Order with ID ${id} not found.`);
      }

      return order;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching order with ID ${id}: ${error.message}`);
      }
      throw new Error('An unknown error occurred while fetching the order.');
    }
  }

  /**
   * Update the status of an order.
   * @param id - The ID of the order.
   * @param data - The new status for the order.
   * @returns The updated order.
   */
  async updateOrderStatus(id: number, data: UpdateOrderStatusDTO) {
    try {
      // Validate input data
      const validatedData = updateOrderStatusSchema.parse(data);

      const updatedOrder = await prisma.order.update({
        where: { id },
        data: { status: validatedData.status },
      });

      return updatedOrder;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Validation Error: ${error.issues.map((issue) => issue.message).join(', ')}`);
      }
      if (error instanceof Error) {
        throw new Error(`Error updating order status: ${error.message}`);
      }
      throw new Error('An unknown error occurred while updating the order status.');
    }
  }

  /**
   * Delete an order by its ID.
   * @param id - The ID of the order.
   */
  async deleteOrder(id: number) {
    try {
      const orderExists = await prisma.order.findUnique({ where: { id } });

      if (!orderExists) {
        throw new Error(`Order with ID ${id} does not exist.`);
      }

      await prisma.order.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting order with ID ${id}: ${error.message}`);
      }
      throw new Error('An unknown error occurred while deleting the order.');
    }
  }
}

export default new OrderService();
