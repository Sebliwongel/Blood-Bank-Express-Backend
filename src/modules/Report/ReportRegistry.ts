import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { ReportSchema, NewReportSchema, UpdateReportSchema } from "./ReportSchema";

export const reportRegistry = new AccessibleOpenAPIRegistry();

reportRegistry.register("Report", ReportSchema);
reportRegistry.register("NewReport", NewReportSchema);

// Register the POST path for creating a report
reportRegistry.registerPath({
  method: "post",
  path: "/api/report",
  summary: "Create a new report",
  tags: ["Report"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewReportSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created report",
      content: {
        "application/json": {
          schema: ReportSchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all reports
reportRegistry.registerPath({
  method: "get",
  path: "/api/report",
  summary: "Get all reports",
  tags: ["Report"],
  responses: {
    200: {
      description: "A list of reports",
      content: {
        "application/json": {
          schema: z.array(ReportSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving a report by ID
reportRegistry.registerPath({
  method: "get",
  path: "/api/report/{id}",
  summary: "Get a report by ID",
  tags: ["Report"],
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
      description: "The report with the specified ID",
      content: {
        "application/json": {
          schema: ReportSchema,
        },
      },
    },
    404: {
      description: "Report not found",
    },
  },
});

// Register the PATCH path for updating a report
reportRegistry.registerPath({
  method: "patch",
  path: "/api/report/{id}",
  summary: "Update a report",
  tags: ["Report"],
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
          schema: UpdateReportSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated report",
      content: {
        "application/json": {
          schema: ReportSchema,
        },
      },
    },
    404: {
      description: "Report not found",
    },
  },
});

// Register the DELETE path for deleting a report
reportRegistry.registerPath({
  method: "delete",
  path: "/api/report/{id}",
  summary: "Delete a report",
  tags: ["Report"],
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
      description: "Report deleted successfully",
    },
    404: {
      description: "Report not found",
    },
  },
});
