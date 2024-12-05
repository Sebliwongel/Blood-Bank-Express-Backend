//import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";  // Zod for validation schemas
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";  // If this is used for combining registries

// Ensure this is the correct import path for your NotificationSchemas
//import { NotificationCreateSchema, NotificationUpdateSchema } from "./NotificationSchema";  // These are used for registering paths

export const notificationRegistry = new AccessibleOpenAPIRegistry();

// Define Zod schemas for Notification
const NotificationSchema = z.object({
  id: z.number(),
  content: z.string(),
  donorId: z.number().optional(),
  hospitalId: z.number().optional(),
  userId: z.number().optional(),
});

const NewNotificationSchema = z.object({
  content: z.string().min(1, "Content is required"),
  donorId: z.number().optional(),
  hospitalId: z.number().optional(),
  userId: z.number().optional(),
});

const UpdateNotificationSchema = z.object({
  content: z.string().min(1, "Content must be at least 1 character").optional(),
  donorId: z.number().optional(),
  hospitalId: z.number().optional(),
  userId: z.number().optional(),
});

// Register the schemas for Notification
notificationRegistry.register("Notification", NotificationSchema);
notificationRegistry.register("NewNotification", NewNotificationSchema);
notificationRegistry.register("UpdateNotification", UpdateNotificationSchema);

// Register the POST path for creating a new notification
notificationRegistry.registerPath({
  method: "post",
  path: "/api/notification",
  summary: "Create a new notification",
  tags: ["Notification"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewNotificationSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created notification",
      content: {
        "application/json": {
          schema: NotificationSchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all notifications
notificationRegistry.registerPath({
  method: "get",
  path: "/api/notification",
  summary: "Get all notifications",
  tags: ["Notification"],
  responses: {
    200: {
      description: "A list of notifications",
      content: {
        "application/json": {
          schema: z.array(NotificationSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving a notification by ID
notificationRegistry.registerPath({
  method: "get",
  path: "/api/notification/{id}",
  summary: "Get a notification by ID",
  tags: ["Notification"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string" }, // Assuming ID is a string or number
    },
  ],
  responses: {
    200: {
      description: "The notification with the specified ID",
      content: {
        "application/json": {
          schema: NotificationSchema,
        },
      },
    },
    404: {
      description: "Notification not found",
    },
  },
});

// Register the PATCH path for updating a notification
notificationRegistry.registerPath({
  method: "patch",
  path: "/api/notification/{id}",
  summary: "Update a notification",
  tags: ["Notification"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string" }, // Assuming ID is a string or number
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateNotificationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated notification",
      content: {
        "application/json": {
          schema: NotificationSchema,
        },
      },
    },
    404: {
      description: "Notification not found",
    },
  },
});

// Register the DELETE path for deleting a notification
notificationRegistry.registerPath({
  method: "delete",
  path: "/api/notification/{id}",
  summary: "Delete a notification",
  tags: ["Notification"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string" }, // Assuming ID is a string or number
    },
  ],
  responses: {
    204: {
      description: "Notification deleted successfully",
    },
    404: {
      description: "Notification not found",
    },
  },
});
