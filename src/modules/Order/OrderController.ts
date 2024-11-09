import { validateAndParse } from "../../utils/validateAndParseRequest";
import { OrderSchema, UpdateOrderSchema } from "./OrderSchema";
import { Request, Response } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "./OrderService";

// Create a new order
export const createOrderController = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(OrderSchema, req);
    const newOrder = await createOrder(
      parsed.orderDate,
      parsed.bloodType,
      parsed.quantity,
      parsed.status,
      parsed.hospitalId
    );
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get all orders
export const getAllOrderController = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

// Get an order by ID
export const getOrderByIdController = async (req: Request, res: Response) => {
  const orderId = req.params.id; // Assuming the ID is passed as a route parameter
  try {
    const order = await getOrderById(parseInt(orderId));
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve order" });
  }
};

// Update an order
export const updateOrderController = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const parsed = await validateAndParse(UpdateOrderSchema, req);
    const updatedOrder = await updateOrder(parseInt(orderId), parsed);
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update order" });
  }
};

// Delete an order
export const deleteOrderController = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const deleted = await deleteOrder(parseInt(orderId));
    if (!deleted) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};
