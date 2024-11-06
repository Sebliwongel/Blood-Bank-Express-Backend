import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { NotificationSchema, NewNotificationSchema, UpdateNotificationSchema } from "./NotificationSchema";

export const notificationRegistry = new AccessibleOpenAPIRegistry();

// Register the schemas for Notification
notificationRegistry.register("Notification", NotificationSchema);
notificationRegistry.register("NewNotification", NewNotificationSchema);

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
      schema: { type: "string" }, // Assuming ID is a string
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
      schema: { type: "string" }, // Assuming ID is a string
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
      schema: { type: "string" }, // Assuming ID is a string
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
