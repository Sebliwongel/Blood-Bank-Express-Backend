import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import {
  HospitalSchema,
  CreateHospitalSchema,
  UpdateHospitalSchema,
  HospitalIdSchema,
} from "./HospitalSchema";

export const hospitalRegistry = new AccessibleOpenAPIRegistry();

// Register schemas
hospitalRegistry.register("Hospital", HospitalSchema);
hospitalRegistry.register("CreateHospital", CreateHospitalSchema);
hospitalRegistry.register("UpdateHospital", UpdateHospitalSchema);
hospitalRegistry.register("HospitalId", HospitalIdSchema);

// GET /api/hospitals - Get all hospitals
hospitalRegistry.registerPath({
  method: "get",
  path: "/api/hospitals",
  summary: "Get all hospitals",
  tags: ["Hospital"],
  responses: {
    200: {
      description: "List of hospitals",
      content: {
        "application/json": {
          schema: z.array(HospitalSchema),
        },
      },
    },
  },
});

// GET /api/hospitals/:id - Get hospital by ID
hospitalRegistry.registerPath({
  method: "get",
  path: "/api/hospitals/{id}",
  summary: "Get hospital by ID",
  tags: ["Hospital"],
  request: {
    params: HospitalIdSchema,
  },
  responses: {
    200: {
      description: "Hospital details",
      content: {
        "application/json": {
          schema: HospitalSchema,
        },
      },
    },
    404: {
      description: "Hospital not found",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
  },
});

// POST /api/hospitals - Create new hospital
hospitalRegistry.registerPath({
  method: "post",
  path: "/api/hospitals",
  summary: "Create new hospital",
  tags: ["Hospital"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateHospitalSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Hospital created successfully",
      content: {
        "application/json": {
          schema: HospitalSchema,
        },
      },
    },
    409: {
      description: "Hospital already exists",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
            details: z.string(),
          }),
        },
      },
    },
  },
});

// PATCH /api/hospitals/:id - Full update hospital
hospitalRegistry.registerPath({
  method: "patch",
  path: "/api/hospitals/{id}",
  summary: "Full update hospital",
  tags: ["Hospital"],
  request: {
    params: HospitalIdSchema,
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
      description: "Hospital updated successfully",
      content: {
        "application/json": {
          schema: HospitalSchema,
        },
      },
    },
    404: {
      description: "Hospital not found",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
    409: {
      description: "Update failed due to conflict",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
            details: z.string(),
          }),
        },
      },
    },
  },
});

// PATCH /api/hospitals/:id/patch - Partial update hospital
hospitalRegistry.registerPath({
  method: "patch",
  path: "/api/hospitals/{id}/patch",
  summary: "Partial update hospital",
  tags: ["Hospital"],
  request: {
    params: HospitalIdSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateHospitalSchema.partial(),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Hospital partially updated successfully",
      content: {
        "application/json": {
          schema: HospitalSchema,
        },
      },
    },
    404: {
      description: "Hospital not found",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
    409: {
      description: "Update failed due to conflict",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
            details: z.string(),
          }),
        },
      },
    },
  },
});

// DELETE /api/hospitals/:id - Delete hospital
hospitalRegistry.registerPath({
  method: "delete",
  path: "/api/hospitals/{id}",
  summary: "Delete hospital",
  tags: ["Hospital"],
  request: {
    params: HospitalIdSchema,
  },
  responses: {
    200: {
      description: "Hospital deleted successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: "Hospital not found",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
  },
});
