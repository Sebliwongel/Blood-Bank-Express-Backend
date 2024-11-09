
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all orders
export const getAllOrders = async () => {
  return await prisma.order.findMany();
};

// Update an order by ID
export const updateOrder = async (
  orderId: number,
  updates: { bloodType?: string; quantity?: number; status?: string; hospitalId?: number }
) => {
  // First, find the order by ID
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  // If the order does not exist, return null or handle accordingly
  if (!order) {
    return null;
  }

  // Update the order with the provided fields
  return await prisma.order.update({
    where: { id: orderId },
    data: {
      bloodType: updates.bloodType !== undefined ? updates.bloodType : order.bloodType,
      quantity: updates.quantity !== undefined ? updates.quantity : order.quantity,
      status: updates.status !== undefined ? updates.status : order.status,
      hospitalId: updates.hospitalId !== undefined ? updates.hospitalId : order.hospitalId,
    },
  });
};

// Get an order by ID
export const getOrderById = async (id: number) => {
  return await prisma.order.findUnique({
    where: { id },
  });
};

// Create a new order
export const createOrder = async (
  orderDate: Date,
  bloodType: string,
  quantity: number,
  status: string,
  hospitalId: number
) => {
  return await prisma.order.create({
    data: {
      orderDate,
      bloodType,
      quantity,
      status,
      hospitalId,
    },
  });
};

// Delete an order by ID
export const deleteOrder = async (id: number) => {
  return await prisma.order.delete({
    where: { id },
  });
};
