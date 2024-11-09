import express from "express";
import {
  createOrderController,
  getAllOrderController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController,
} from "./OrderController";

const router = express.Router();

// Route to create a new order
router.post("/orders", createOrderController);

// Route to get all orders
router.get("/orders", getAllOrderController);

// Route to get an order by ID
router.get("/orders/:id", getOrderByIdController);

// Route to update an order by ID
router.put("/orders/:id", updateOrderController);

// Route to delete an order by ID
router.delete("/orders/:id", deleteOrderController);

export default router;
