import { z } from "zod";

// Schema for creating a new notification
export const NewNotificationSchema = z
  .object({
    content: z.string().openapi({ example: "Blood donation request" }),
    hospitalId: z.number().optional().openapi({ example: 1 }), // Optional field for hospital
    donorId: z.number().optional().openapi({ example: 1 }),    // Optional field for donor
    adminId: z.number().optional().openapi({ example: 1 }),    // Optional field for admin
  })
  .openapi("New Notification");

// Schema for an existing notification (full details)
export const NotificationSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    content: z.string().openapi({ example: "Blood donation request" }),
    sendDate: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Date when the notification was sent
    hospitalId: z.number().optional().openapi({ example: 1 }), // Optional field for hospital
    donorId: z.number().optional().openapi({ example: 1 }),   // Optional field for donor
    adminId: z.number().optional().openapi({ example: 1 }),   // Optional field for admin
    hospital: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .optional(),
    donor: z
      .object({
        id: z.number(),
        bloodType: z.string(),
      })
      .optional(),
    systemAdmin: z
      .object({
        id: z.number(),
        username: z.string(),
      })
      .optional(),
  })
  .openapi("Notification");

// Schema for updating an existing notification
export const UpdateNotificationSchema = z
  .object({
    content: z.string().optional().openapi({ example: "Updated blood donation request" }),
    hospitalId: z.number().optional().openapi({ example: 1 }),
    donorId: z.number().optional().openapi({ example: 1 }),
    adminId: z.number().optional().openapi({ example: 1 }),
  })
  .openapi("Update Notification");
