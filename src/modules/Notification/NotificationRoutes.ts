import { Router } from "express";
import {
  createNotificationController,
  deleteNotificationController,
  getAllNotificationsController,
  getNotificationByIdController,
  updateNotificationController,
} from "./NotificationController";

const router = Router();

// Create a new notification
router.post("/notification", createNotificationController);

// Get all notifications
router.get("/notification", getAllNotificationsController);

// Get a notification by ID
router.get("/notification/:id", getNotificationByIdController);

// Update a notification
router.patch("/notification/:id", updateNotificationController);

// Delete a notification
router.delete("/notification/:id", deleteNotificationController);

export default router;
