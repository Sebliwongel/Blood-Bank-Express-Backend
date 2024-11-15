import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { DonorSchema, NewDonorSchema, UpdateDonorSchema } from "./donorSchema";

export const donorRegistry = new AccessibleOpenAPIRegistry();

// Register donor schemas
donorRegistry.register("Donor", DonorSchema);
donorRegistry.register("NewDonor", NewDonorSchema);
donorRegistry.register("UpdateDonor", UpdateDonorSchema);

// Register the POST path for creating a donor
donorRegistry.registerPath({
  method: "post",
  path: "/api/donor",
  summary: "Register a new donor",
  tags: ["Donor"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewDonorSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created donor",
      content: {
        "application/json": {
          schema: DonorSchema,
        },
      },
    },
    400: {
      description: "Invalid input data",
    },
  },
});

// Register the GET path for retrieving all donors
donorRegistry.registerPath({
  method: "get",
  path: "/api/donor",
  summary: "Get all donors",
  tags: ["Donor"],
  responses: {
    200: {
      description: "A list of donors",
      content: {
        "application/json": {
          schema: z.array(DonorSchema),
        },
      },
    },
    404: {
      description: "No donors found",
    },
  },
});

// Register the GET path for retrieving a donor by ID
donorRegistry.registerPath({
  method: "get",
  path: "/api/donor/{id}",
  summary: "Get a donor by ID",
  tags: ["Donor"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "integer" }, // Ensure consistency with ID type
    },
  ],
  responses: {
    200: {
      description: "The donor with the specified ID",
      content: {
        "application/json": {
          schema: DonorSchema,
        },
      },
    },
    404: {
      description: "Donor not found",
    },
    400: {
      description: "Invalid ID format",
    },
  },
});

// Register the PATCH path for updating a donor
donorRegistry.registerPath({
  method: "patch",
  path: "/api/donor/{id}",
  summary: "Update a donor",
  tags: ["Donor"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "integer" }, // Ensure consistency with ID type
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateDonorSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated donor",
      content: {
        "application/json": {
          schema: DonorSchema,
        },
      },
    },
    404: {
      description: "Donor not found",
    },
    400: {
      description: "Invalid input data or ID",
    },
  },
});

// Register the DELETE path for deleting a donor
donorRegistry.registerPath({
  method: "delete",
  path: "/api/donor/{id}",
  summary: "Delete a donor",
  tags: ["Donor"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "integer" }, // Ensure consistency with ID type
    },
  ],
  responses: {
    204: {
      description: "Donor deleted successfully",
    },
    404: {
      description: "Donor not found",
    },
    400: {
      description: "Invalid ID format",
    },
  },
});
