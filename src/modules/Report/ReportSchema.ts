import { z } from "zod";

// New Report Schema
export const NewReportSchema = z
  .object({
    title: z.string().openapi({ example: "Monthly Report" }),
    content: z.string().openapi({ example: "This is the content of the report." }),
    generatedBy: z.number().openapi({ example: 1 }), // The user who generated the report
  })
  .openapi("New Report");

// Report Schema
export const ReportSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    title: z.string().openapi({ example: "Monthly Report" }),
    content: z.string().openapi({ example: "This is the content of the report." }),
    generatedBy: z.number().openapi({ example: 1 }),
    user: z.object({
      id: z.number().openapi({ example: 1 }),
      name: z.string().openapi({ example: "John Doe" }),
      // Add other fields for the User schema as required
    }).openapi("User"),
    createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
    updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }),
  })
  .openapi("Report");

// Update Report Schema
export const UpdateReportSchema = z
  .object({
    title: z.string().optional().openapi({ example: "Updated Report Title" }),
    content: z.string().optional().openapi({ example: "Updated content of the report." }),
    generatedBy: z.number().optional().openapi({ example: 1 }), // Optional field
  })
  .openapi("Update Report");
