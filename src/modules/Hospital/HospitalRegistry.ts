import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { HospitalSchema, NewHospitalSchema, UpdateHospitalSchema } from "./HospitalSchema";

export const hospitalRegistry = new AccessibleOpenAPIRegistry();

hospitalRegistry.register("Hospital", HospitalSchema);
hospitalRegistry.register("NewHospital", NewHospitalSchema);

// Register the POST path for creating a new hospital
hospitalRegistry.registerPath({
  method: "post",
  path: "/api/hospitals",
  summary: "Register a new hospital",
  tags: ["Hospital"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewHospitalSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created hospital",
      content: {
        "application/json": {
          schema: HospitalSchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all hospitals
hospitalRegistry.registerPath({
  method: "get",
  path: "/api/hospitals",
  summary: "Get all hospitals",
  tags: ["Hospital"],
  responses: {
    200: {
      description: "A list of hospitals",
      content: {
        "application/json": {
          schema: z.array(HospitalSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving a hospital by ID
hospitalRegistry.registerPath({
  method: "get",
  path: "/api/hospitals/{id}",
  summary: "Get a hospital by ID",
  tags: ["Hospital"],
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
      description: "The hospital with the specified ID",
      content: {
        "application/json": {
          schema: HospitalSchema,
        },
      },
    },
    404: {
      description: "Hospital not found",
    },
  },
});

// Register the PATCH path for updating a hospital
hospitalRegistry.registerPath({
  method: "patch",
  path: "/api/hospitals/{id}",
  summary: "Update a hospital",
  tags: ["Hospital"],
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
          schema: UpdateHospitalSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated hospital",
      content: {
        "application/json": {
          schema: HospitalSchema,
        },
      },
    },
    404: {
      description: "Hospital not found",
    },
  },
});

// Register the DELETE path for deleting a hospital
hospitalRegistry.registerPath({
  method: "delete",
  path: "/api/hospitals/{id}",
  summary: "Delete a hospital",
  tags: ["Hospital"],
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
      description: "Hospital deleted successfully",
    },
    404: {
      description: "Hospital not found",
    },
  },
});
