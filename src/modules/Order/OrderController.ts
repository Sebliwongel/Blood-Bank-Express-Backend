import { Request, Response } from 'express';
import orderService from '../Order/OrderService';
import { OrderStatus } from '@prisma/client';

class OrderController {
  // Create a new order
  async createOrder(req: Request, res: Response) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      const err = error as Error; // Typecast 'error' to Error
      res.status(400).json({ message: err.message });
    }
  }

  // Get all orders
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      const err = error as Error; // Typecast 'error' to Error
      res.status(500).json({ message: err.message });
    }
  }

  // Get an order by ID
  async getOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(Number(id));
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      const err = error as Error; // Typecast 'error' to Error
      res.status(400).json({ message: err.message });
    }
  }

  // Update an order's status
  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await orderService.updateOrderStatus(Number(id), status as OrderStatus);
      res.status(200).json(updatedOrder);
    } catch (error) {
      const err = error as Error; // Typecast 'error' to Error
      res.status(400).json({ message: err.message });
    }
  }

  // Delete an order
  async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await orderService.deleteOrder(Number(id));
      res.status(204).send();
    } catch (error) {
      const err = error as Error; // Typecast 'error' to Error
      res.status(400).json({ message: err.message });
    }
  }
}

export default new OrderController();
