import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { NewBloodSchema, UpdateBloodSchema } from "./BloodSchema";

// Initialize the BloodRegistry
export const bloodRegistry = new AccessibleOpenAPIRegistry();

// Schema for blood inventory record (GET response schema)
const BloodSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  donorId: z.number().openapi({ example: 1 }),
  bloodType: z.string().openapi({ example: "O+" }),
  quantity: z.string().openapi({ example: "5" }),
  barcode: z.string().openapi({ example: "123456789" }),
  donationDate: z.string().openapi({ example: "2023-12-15T10:00:00.000Z" }),
  expirationDate: z.string().openapi({ example: "2024-01-15T10:00:00.000Z" }),
  storageStatus: z.enum(["AVAILABLE", "RESERVED", "EXPIRED"]).openapi({ example: "AVAILABLE" }),
});

// Register the schemas
bloodRegistry.register("Blood", BloodSchema);
bloodRegistry.register("NewBlood", NewBloodSchema);
bloodRegistry.register("UpdateBlood", UpdateBloodSchema);

// Register the POST path for creating a blood record
bloodRegistry.registerPath({
  method: "post",
  path: "/api/blood",
  summary: "Create a new blood inventory record",
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
      description: "The created blood inventory record",
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
  summary: "Get all blood inventory records",
  tags: ["Blood"],
  responses: {
    200: {
      description: "A list of blood inventory records",
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
  summary: "Get a blood inventory record by ID",
  tags: ["Blood"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "number" }, // Assuming ID is a number
    },
  ],
  responses: {
    200: {
      description: "The blood inventory record with the specified ID",
      content: {
        "application/json": {
          schema: BloodSchema,
        },
      },
    },
    404: {
      description: "Blood inventory record not found",
    },
  },
});

// Register the PATCH path for updating a blood record
bloodRegistry.registerPath({
  method: "patch",
  path: "/api/blood/{id}",
  summary: "Update a blood inventory record",
  tags: ["Blood"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "number" }, // Assuming ID is a number
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
      description: "The updated blood inventory record",
      content: {
        "application/json": {
          schema: BloodSchema,
        },
      },
    },
    404: {
      description: "Blood inventory record not found",
    },
  },
});

// Register the DELETE path for deleting a blood record
bloodRegistry.registerPath({
  method: "delete",
  path: "/api/blood/{id}",
  summary: "Delete a blood inventory record",
  tags: ["Blood"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "number" }, // Assuming ID is a number
    },
  ],
  responses: {
    204: {
      description: "Blood inventory record deleted successfully",
    },
    404: {
      description: "Blood inventory record not found",
    },
  },
});
