import { prisma } from './../../../prisma/prisma'; // Adjust path as needed
import { OrderStatus, BloodType } from '@prisma/client';

interface CreateOrderDTO {
  orderDate: Date;
  bloodType: BloodType;
  quantity: number;
  storageStatus: keyof typeof OrderStatus; // Map string keys to enum
  hospitalId: number;
}

class OrderService {
  async createOrder(data: CreateOrderDTO) {
    const statusMapping: Record<string, OrderStatus> = {
      PENDING: OrderStatus.PENDING,
      COMPLETED: OrderStatus.COMPLETED,
      CANCELED: OrderStatus.CANCELED,
    };

    // Map string input to OrderStatus
    const status = statusMapping[data.storageStatus];
    if (!status) {
      throw new Error('Invalid order status provided');
    }

    // Validate blood type
    const validBloodTypes = [
      "A_POS", "A_NEG", "B_POS", "B_NEG",
      "AB_POS", "AB_NEG", "O_POS", "O_NEG",
    ];
    if (!validBloodTypes.includes(data.bloodType)) {
      throw new Error('Invalid blood type provided');
    }

    // Create order
    return await prisma.order.create({
      data: {
        orderDate: data.orderDate,
        bloodType: data.bloodType,
        quantity: data.quantity,
        status,
        hospital: {
          connect: { id: data.hospitalId },
        },
      },
    });
  }

  async getAllOrders() {
    return await prisma.order.findMany({
      include: { hospital: true },
    });
  }

  async getOrderById(id: number) {
    return await prisma.order.findUnique({
      where: { id },
      include: { hospital: true },
    });
  }

  async updateOrderStatus(id: number, status: OrderStatus) {
    return await prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async deleteOrder(id: number) {
    return await prisma.order.delete({
      where: { id },
    });
  }
}

export default new OrderService();
