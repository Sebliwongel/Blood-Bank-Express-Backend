import { Request, Response } from 'express';
import orderService from './OrderService'; // Adjust the import path as needed
import { createOrderSchema, updateOrderStatusSchema } from './OrderSchema';

class OrderController {
  // Create a new order
  async createOrder(req: Request, res: Response) {
    try {
      // Validate input data with Zod schema
      const validatedData = createOrderSchema.parse(req.body);

      // Call the service to create the order
      const newOrder = await orderService.createOrder(validatedData);

      res.status(201).json({
        message: "Order created successfully",
        order: newOrder,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating order:", error);
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create order" });
      }
    }
  }

  // Get all orders
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to fetch orders" });
      }
    }
  }

  // Get an order by ID
  async getOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Validate the ID parameter
      if (isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid order ID" });
      }

      const order = await orderService.getOrderById(Number(id));
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json(order);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching order by ID:", error);
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to fetch order" });
      }
    }
  }

  // Update an order's status
  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate the ID parameter
      if (isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid order ID" });
      }

      // Validate input data with Zod schema
      const validatedData = updateOrderStatusSchema.parse({ status });

      // Call the service to update the order status
      const updatedOrder = await orderService.updateOrderStatus(Number(id), validatedData);

      res.status(200).json({
        message: "Order status updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating order status:", error);
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to update order status" });
      }
    }
  }

  // Delete an order
  async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Validate the ID parameter
      if (isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid order ID" });
      }

      await orderService.deleteOrder(Number(id));
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting order:", error);
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to delete order" });
      }
    }
  }
}

export default new OrderController();
