import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { OrderSchema, NewOrderSchema, UpdateOrderSchema } from "./OrderSchema";

export const orderRegistry = new AccessibleOpenAPIRegistry();

orderRegistry.register("Order", OrderSchema);
orderRegistry.register("NewOrder", NewOrderSchema);

// Register the POST path for creating an order
orderRegistry.registerPath({
  method: "post",
  path: "/api/orders",
  summary: "Create a new order",
  tags: ["Order"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewOrderSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created order",
      content: {
        "application/json": {
          schema: OrderSchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all orders
orderRegistry.registerPath({
  method: "get",
  path: "/api/orders",
  summary: "Get all orders",
  tags: ["Order"],
  responses: {
    200: {
      description: "A list of orders",
      content: {
        "application/json": {
          schema: z.array(OrderSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving an order by ID
orderRegistry.registerPath({
  method: "get",
  path: "/api/orders/{id}",
  summary: "Get an order by ID",
  tags: ["Order"],
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
      description: "The order with the specified ID",
      content: {
        "application/json": {
          schema: OrderSchema,
        },
      },
    },
    404: {
      description: "Order not found",
    },
  },
});

// Register the PATCH path for updating an order
orderRegistry.registerPath({
  method: "patch",
  path: "/api/orders/{id}",
  summary: "Update an order",
  tags: ["Order"],
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
          schema: UpdateOrderSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated order",
      content: {
        "application/json": {
          schema: OrderSchema,
        },
      },
    },
    404: {
      description: "Order not found",
    },
  },
});

// Register the DELETE path for deleting an order
orderRegistry.registerPath({
  method: "delete",
  path: "/api/orders/{id}",
  summary: "Delete an order",
  tags: ["Order"],
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
      description: "Order deleted successfully",
    },
    404: {
      description: "Order not found",
    },
  },
});
