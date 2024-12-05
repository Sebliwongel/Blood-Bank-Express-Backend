import express from "express";
import OrderController from "./OrderController";

const router = express.Router();

// Route to create a new order
router.post("/orders", (req, res) => OrderController.createOrder(req, res));

// Route to get all orders
router.get("/orders", (req, res) => OrderController.getAllOrders(req, res));

// Route to get an order by ID
router.get("/orders/:id", (req, res) => OrderController.getOrderById(req, res));

// Route to update an order's status by ID
router.put("/orders/:id", (req, res) => OrderController.updateOrderStatus(req, res));

// Route to delete an order by ID
router.delete("/orders/:id", (req, res) => OrderController.deleteOrder(req, res));

export default router;
