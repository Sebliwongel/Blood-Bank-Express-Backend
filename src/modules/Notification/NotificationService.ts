import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { UserRole } from "../../models/enum"; // Adjust the path as needed

const prisma = new PrismaClient();

// Zod schema for notification creation
const NotificationCreateSchema = z.object({
  content: z.string().min(1, "Content is required"),
  senderId: z.number(),
  recipientId: z.number(),
  recipientCategory: z.enum(["user", "donor", "hospital"]), // Contextual flag for the recipient
});

// Get all notifications
export const getAllNotifications = async () => {
  return await prisma.notification.findMany({
    include: {
      hospital: true,
      donor: true,
      user: true,
    },
  });
};

// Get a notification by ID
export const getNotificationById = async (id: number) => {
  return await prisma.notification.findUnique({
    where: { id },
    include: {
      hospital: true,
      donor: true,
      user: true,
    },
  });
};

// Create a new notification
export const createNotification = async (data: unknown) => {
  // Validate the input data
  const parsedData = NotificationCreateSchema.parse(data);

  // Ensure the sender is a system admin
  const sender = await prisma.user.findUnique({
    where: { id: parsedData.senderId },
  });

  if (!sender || sender.role !== UserRole.SYSTEM_ADMIN) {
    throw new Error("Only system admins can send notifications.");
  }

  // Prepare the notification data based on recipient category
  const notificationData = {
    content: parsedData.content,
    senderId: parsedData.senderId,
    [`${parsedData.recipientCategory}Id`]: parsedData.recipientId, // Dynamically assign the recipient field
  };

  // Create the notification
  return await prisma.notification.create({
    data: notificationData,
  });
};

// Update a notification
export const updateNotification = async (
  notificationId: number,
  updates: { content?: string; hospitalId?: number; donorId?: number; userId?: number }
) => {
  // Find the notification by ID
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
  });

  if (!notification) {
    throw new Error("Notification not found.");
  }

  return await prisma.notification.update({
    where: { id: notificationId },
    data: updates,
  });
};

// Delete a notification
export const deleteNotification = async (id: number) => {
  return await prisma.notification.delete({
    where: { id },
  });
};

// Send broadcast notification
export const sendBroadcastNotification = async (content: string, senderId: number) => {
  // Validate the sender
  const sender = await prisma.user.findUnique({
    where: { id: senderId },
  });
  if (!sender || sender.role !== UserRole.SYSTEM_ADMIN) {
    throw new Error("Only system admins can send broadcast notifications.");
  }

  // Retrieve all users, donors, and hospitals
  const users = await prisma.user.findMany();
  const donors = await prisma.donor.findMany();
  const hospitals = await prisma.hospital.findMany();

  // Construct notification data for all recipients
  const notifications = [
    ...users.map(user => ({ content, userId: user.id, senderId })),
    ...donors.map(donor => ({ content, donorId: donor.id, senderId })),
    ...hospitals.map(hospital => ({ content, hospitalId: hospital.id, senderId })),
  ];

  // Bulk insert notifications
  return await prisma.notification.createMany({
    data: notifications,
    skipDuplicates: true, // Optional: Skip duplicate entries
  });
};
