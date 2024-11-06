import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { BloodSchema, NewBloodSchema, UpdateBloodSchema } from "./BloodSchema"; // Assume you have the new schemas

// Initialize the BloodRegistry
export const bloodRegistry = new AccessibleOpenAPIRegistry();

// Register the Blood schemas
bloodRegistry.register("Blood", BloodSchema);
bloodRegistry.register("NewBlood", NewBloodSchema);

// Register the POST path for creating a blood record
bloodRegistry.registerPath({
  method: "post",
  path: "/api/blood",
  summary: "Create a new blood record",
  tags: ["Blood"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewBloodSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created blood record",
      content: {
        "application/json": {
          schema: BloodSchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all blood records
bloodRegistry.registerPath({
  method: "get",
  path: "/api/blood",
  summary: "Get all blood records",
  tags: ["Blood"],
  responses: {
    200: {
      description: "A list of blood records",
      content: {
        "application/json": {
          schema: z.array(BloodSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving a blood record by ID
bloodRegistry.registerPath({
  method: "get",
  path: "/api/blood/{id}",
  summary: "Get a blood record by ID",
  tags: ["Blood"],
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
      description: "The blood record with the specified ID",
      content: {
        "application/json": {
          schema: BloodSchema,
        },
      },
    },
    404: {
      description: "Blood record not found",
    },
  },
});

// Register the PATCH path for updating a blood record
bloodRegistry.registerPath({
  method: "patch",
  path: "/api/blood/{id}",
  summary: "Update a blood record",
  tags: ["Blood"],
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
          schema: UpdateBloodSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated blood record",
      content: {
        "application/json": {
          schema: BloodSchema,
        },
      },
    },
    404: {
      description: "Blood record not found",
    },
  },
});

// Register the DELETE path for deleting a blood record
bloodRegistry.registerPath({
  method: "delete",
  path: "/api/blood/{id}",
  summary: "Delete a blood record",
  tags: ["Blood"],
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
      description: "Blood record deleted successfully",
    },
    404: {
      description: "Blood record not found",
    },
  },
});
