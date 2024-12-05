import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { IntegrationSchema, NewIntegrationSchema, UpdateIntegrationSchema } from "./IntegrationSchema";

export const integrationRegistry = new AccessibleOpenAPIRegistry();

// Register schemas
integrationRegistry.register("Integration", IntegrationSchema);
integrationRegistry.register("NewIntegration", NewIntegrationSchema);
integrationRegistry.register("UpdateIntegration", UpdateIntegrationSchema);

// Register the POST path for creating an integration
integrationRegistry.registerPath({
  method: "post",
  path: "/api/integration",
  summary: "Register a new integration",
  tags: ["Integration"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewIntegrationSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created integration",
      content: {
        "application/json": {
          schema: IntegrationSchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all integrations
integrationRegistry.registerPath({
  method: "get",
  path: "/api/integration",
  summary: "Get all integrations",
  tags: ["Integration"],
  responses: {
    200: {
      description: "A list of integrations",
      content: {
        "application/json": {
          schema: z.array(IntegrationSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving an integration by ID
integrationRegistry.registerPath({
  method: "get",
  path: "/api/integration/{id}",
  summary: "Get an integration by ID",
  tags: ["Integration"],
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
      description: "The integration with the specified ID",
      content: {
        "application/json": {
          schema: IntegrationSchema,
        },
      },
    },
    404: {
      description: "Integration not found",
    },
  },
});

// Register the PATCH path for updating an integration
integrationRegistry.registerPath({
  method: "patch",
  path: "/api/integration/{id}",
  summary: "Update an integration",
  tags: ["Integration"],
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
          schema: UpdateIntegrationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated integration",
      content: {
        "application/json": {
          schema: IntegrationSchema,
        },
      },
    },
    404: {
      description: "Integration not found",
    },
  },
});

// Register the DELETE path for deleting an integration
integrationRegistry.registerPath({
  method: "delete",
  path: "/api/integration/{id}",
  summary: "Delete an integration",
  tags: ["Integration"],
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
      description: "Integration deleted successfully",
    },
    404: {
      description: "Integration not found",
    },
  },
});

// Register the POST path for approving an integration
integrationRegistry.registerPath({
  method: "post",
  path: "/api/integration/{id}/approve",
  summary: "Approve an integration request",
  tags: ["Integration"],
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
          schema: z.object({
            managerId: z.string(),
            comment: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "The approved integration",
      content: {
        "application/json": {
          schema: IntegrationSchema,
        },
      },
    },
    404: {
      description: "Integration not found",
    },
  },
});

// Register the POST path for declining an integration
integrationRegistry.registerPath({
  method: "post",
  path: "/api/integration/{id}/decline",
  summary: "Decline an integration request",
  tags: ["Integration"],
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
          schema: z.object({
            managerId: z.string(),
            comment: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "The declined integration",
      content: {
        "application/json": {
          schema: IntegrationSchema,
        },
      },
    },
    404: {
      description: "Integration not found",
    },
  },
});
