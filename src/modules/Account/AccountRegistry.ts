import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { AccountSchema, NewAccountSchema, UpdateAccountSchema } from "./AccountSchema"; // Assume you have the new schemas

// Initialize the AccountRegistry
export const accountRegistry = new AccessibleOpenAPIRegistry();

// Register the Account schemas
accountRegistry.register("Account", AccountSchema);
accountRegistry.register("NewAccount", NewAccountSchema);

// Register the POST path for creating an account record
accountRegistry.registerPath({
  method: "post",
  path: "/api/accounts",
  summary: "Create a new account record",
  tags: ["Account"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewAccountSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created account record",
      content: {
        "application/json": {
          schema: AccountSchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all account records
accountRegistry.registerPath({
  method: "get",
  path: "/api/account",
  summary: "Get all account records",
  tags: ["Account"],
  responses: {
    200: {
      description: "A list of account records",
      content: {
        "application/json": {
          schema: z.array(AccountSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving an account record by ID
accountRegistry.registerPath({
  method: "get",
  path: "/api/account/{id}",
  summary: "Get an account record by ID",
  tags: ["Account"],
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
      description: "The account record with the specified ID",
      content: {
        "application/json": {
          schema: AccountSchema,
        },
      },
    },
    404: {
      description: "Account record not found",
    },
  },
});

// Register the PATCH path for updating an account record
accountRegistry.registerPath({
  method: "patch",
  path: "/api/account/{id}",
  summary: "Update an account record",
  tags: ["Account"],
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
          schema: UpdateAccountSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated account record",
      content: {
        "application/json": {
          schema: AccountSchema,
        },
      },
    },
    404: {
      description: "Account record not found",
    },
  },
});

// Register the DELETE path for deleting an account record
accountRegistry.registerPath({
  method: "delete",
  path: "/api/account/{id}",
  summary: "Delete an account record",
  tags: ["Account"],
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
      description: "Account record deleted successfully",
    },
    404: {
      description: "Account record not found",
    },
  },
});
