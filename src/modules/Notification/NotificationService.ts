import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all notifications
export const getAllNotifications = async () => {
  return await prisma.notification.findMany({
    include: {
      hospital: true,    // Include related hospital
      donor: true,       // Include related donor
      systemAdmin: true, // Include related system admin
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
      systemAdmin: true,
    },
  });
};

// Create a new notification
export const createNotification = async (
  content: string,
  hospitalId?: number,
  donorId?: number,
  adminId?: number
) => {
  return await prisma.notification.create({
    data: {
      content,
      hospitalId,
      donorId,
      adminId,
    },
  });
};

// Update a notification
export const updateNotification = async (
  notificationId: number,
  updates: { content?: string; hospitalId?: number; donorId?: number; adminId?: number }
) => {
  // First, find the notification by ID
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
  });

  // If the notification does not exist, return null or handle accordingly
  if (!notification) {
    return null;
  }

  // Update the notification with the provided fields
  return await prisma.notification.update({
    where: { id: notificationId },
    data: {
      content: updates.content !== undefined ? updates.content : notification.content,
      hospitalId: updates.hospitalId ?? notification.hospitalId,
      donorId: updates.donorId ?? notification.donorId,
      adminId: updates.adminId ?? notification.adminId,
    },
  });
};

// Delete a notification
export const deleteNotification = async (id: number) => {
  return await prisma.notification.delete({
    where: { id },
  });
};
