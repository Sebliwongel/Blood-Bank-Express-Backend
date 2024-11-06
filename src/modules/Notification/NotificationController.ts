import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewNotificationSchema, UpdateNotificationSchema } from "./NotificationSchema";
import { Request, Response } from "express";
import {
  createNotification,
  deleteNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
} from "./NotificationService";

// Create a new notification
export const createNotificationController = async (req: Request, res: Response) => {
  try {
    // Validate and parse the request body
    const parsed = await validateAndParse(NewNotificationSchema, req);

    // Create the new notification
    const newNotification = await createNotification(
      parsed.content,
      parsed.hospitalId,
      parsed.donorId,
      parsed.adminId
    );

    res.status(201).json(newNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create notification" });
  }
};

// Get all notifications
export const getAllNotificationsController = async (req: Request, res: Response) => {
  try {
    const notifications = await getAllNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve notifications" });
  }
};

// Get a notification by ID
export const getNotificationByIdController = async (req: Request, res: Response) => {
  const notificationId = req.params.id; // Assuming the ID is passed as a route parameter
  try {
    const notification = await getNotificationById(parseInt(notificationId));
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve notification" });
  }
};

// Update a notification
export const updateNotificationController = async (req: Request, res: Response) => {
  const notificationId = req.params.id;
  try {
    // Validate and parse the request body for updates
    const parsed = await validateAndParse(UpdateNotificationSchema, req);

    // Update the notification
    const updatedNotification = await updateNotification(parseInt(notificationId), parsed);

    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update notification" });
  }
};

// Delete a notification
export const deleteNotificationController = async (req: Request, res: Response) => {
  const notificationId = req.params.id;
  try {
    const deleted = await deleteNotification(parseInt(notificationId));
    if (!deleted) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete notification" });
  }
};
