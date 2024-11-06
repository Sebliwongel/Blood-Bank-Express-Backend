import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { InventorySchema, NewInventorySchema, UpdateInventorySchema } from "./InventorySchema"; // Ensure to adjust these imports

export const inventoryRegistry = new AccessibleOpenAPIRegistry();

// Register schemas
inventoryRegistry.register("Inventory", InventorySchema);
inventoryRegistry.register("NewInventory", NewInventorySchema);

// Register the POST path for creating a new inventory record
inventoryRegistry.registerPath({
  method: "post",
  path: "/api/inventory",
  summary: "Create a new inventory record",
  tags: ["Inventory"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewInventorySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created inventory record",
      content: {
        "application/json": {
          schema: InventorySchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all inventory records
inventoryRegistry.registerPath({
  method: "get",
  path: "/api/inventory",
  summary: "Get all inventory records",
  tags: ["Inventory"],
  responses: {
    200: {
      description: "A list of all inventory records",
      content: {
        "application/json": {
          schema: z.array(InventorySchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving an inventory record by ID
inventoryRegistry.registerPath({
  method: "get",
  path: "/api/inventory/{id}",
  summary: "Get an inventory record by ID",
  tags: ["Inventory"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "string" }, // Assuming ID is a string (adjust if necessary)
    },
  ],
  responses: {
    200: {
      description: "The inventory record with the specified ID",
      content: {
        "application/json": {
          schema: InventorySchema,
        },
      },
    },
    404: {
      description: "Inventory not found",
    },
  },
});

// Register the PATCH path for updating an inventory record
inventoryRegistry.registerPath({
  method: "patch",
  path: "/api/inventory/{id}",
  summary: "Update an inventory record",
  tags: ["Inventory"],
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
          schema: UpdateInventorySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated inventory record",
      content: {
        "application/json": {
          schema: InventorySchema,
        },
      },
    },
    404: {
      description: "Inventory not found",
    },
  },
});

// Register the DELETE path for deleting an inventory record
inventoryRegistry.registerPath({
  method: "delete",
  path: "/api/inventory/{id}",
  summary: "Delete an inventory record",
  tags: ["Inventory"],
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
      description: "Inventory record deleted successfully",
    },
    404: {
      description: "Inventory not found",
    },
  },
});
