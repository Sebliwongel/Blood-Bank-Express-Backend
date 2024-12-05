import { z } from "zod";

// Zod schema for notification creation
export const NotificationCreateSchema = z.object({
  content: z.string().min(1, "Content is required"), // Content is required and must be at least 1 character
  donorId: z.number().optional(), // Optional donorId
  hospitalId: z.number().optional(), // Optional hospitalId
  userId: z.number().optional(), // Optional userId
});

// Zod schema for notification updates
export const NotificationUpdateSchema = z.object({
  content: z.string().min(1, "Content must be at least 1 character").optional(), // Optional content with a minimum length
  donorId: z.number().optional(), // Optional donorId
  hospitalId: z.number().optional(), // Optional hospitalId
  userId: z.number().optional(), // Optional userId
});
