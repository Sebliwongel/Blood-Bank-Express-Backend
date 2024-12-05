//import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import {
  QualificationSchema,
  NewQualificationSchema,
  UpdateQualificationSchema,
} from "./QulificationSchema";

export const qualificationRegistry = new AccessibleOpenAPIRegistry();

qualificationRegistry.register("Qualification", QualificationSchema);
qualificationRegistry.register("NewQualification", NewQualificationSchema);
qualificationRegistry.register("UpdateQualification", UpdateQualificationSchema);

// Register the POST path for creating a new qualification
qualificationRegistry.registerPath({
  method: "post",
  path: "/api/qualifications",
  summary: "Register a new qualification",
  tags: ["Qualification"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewQualificationSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created qualification",
      content: {
        "application/json": {
          schema: QualificationSchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all qualifications
qualificationRegistry.registerPath({
  method: "get",
  path: "/api/qualifications",
  summary: "Get all qualifications",
  tags: ["Qualification"],
  responses: {
    200: {
      description: "A list of qualifications",
      content: {
        "application/json": {
          schema: z.array(QualificationSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving a qualification by ID
qualificationRegistry.registerPath({
  method: "get",
  path: "/api/qualifications/{id}",
  summary: "Get a qualification by ID",
  tags: ["Qualification"],
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
      description: "The qualification with the specified ID",
      content: {
        "application/json": {
          schema: QualificationSchema,
        },
      },
    },
    404: {
      description: "Qualification not found",
    },
  },
});

// Register the PATCH path for updating a qualification
qualificationRegistry.registerPath({
  method: "patch",
  path: "/api/qualifications/{id}",
  summary: "Update a qualification",
  tags: ["Qualification"],
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
          schema: UpdateQualificationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated qualification",
      content: {
        "application/json": {
          schema: QualificationSchema,
        },
      },
    },
    404: {
      description: "Qualification not found",
    },
  },
});

// Register the DELETE path for deleting a qualification
qualificationRegistry.registerPath({
  method: "delete",
  path: "/api/qualifications/{id}",
  summary: "Delete a qualification",
  tags: ["Qualification"],
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
      description: "Qualification deleted successfully",
    },
    404: {
      description: "Qualification not found",
    },
  },
});
