

import { z } from "zod";
//import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { createOrderSchema, updateOrderStatusSchema } from "./OrderSchema";

export const orderRegistry = new AccessibleOpenAPIRegistry();

// Register Order schema
const OrderSchema = z.object({
  id: z.number().int().positive(),
  orderDate: z.string(),
  bloodType: z.enum(['A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG']),
  quantity: z.number().int().positive(),
  status: z.enum(['PENDING', 'COMPLETED', 'CANCELED']),
  hospitalId: z.number().int().positive(),
});

orderRegistry.register("Order", OrderSchema);

// Register CreateOrder schema
orderRegistry.register("CreateOrder", createOrderSchema);

// Register UpdateOrderStatus schema
orderRegistry.register("UpdateOrderStatus", updateOrderStatusSchema);

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
          schema: createOrderSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Order successfully created",
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
  summary: "Retrieve all orders",
  tags: ["Order"],
  responses: {
    200: {
      description: "A list of all orders",
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
  summary: "Retrieve a specific order by ID",
  tags: ["Order"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "integer" },
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

// Register the PATCH path for updating order status
orderRegistry.registerPath({
  method: "patch",
  path: "/api/orders/{id}",
  summary: "Update an order's status",
  tags: ["Order"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "integer" },
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: updateOrderStatusSchema,
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
  summary: "Delete a specific order",
  tags: ["Order"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "integer" },
    },
  ],
  responses: {
    204: {
      description: "Order successfully deleted",
    },
    404: {
      description: "Order not found",
    },
  },
});
