import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { AppointmentSchema, NewAppointmentSchema, UpdateAppointmentSchema } from "./AppointmentSchema";

export const appointmentRegistry = new AccessibleOpenAPIRegistry();

appointmentRegistry.register("Appointment", AppointmentSchema);
appointmentRegistry.register("NewAppointment", NewAppointmentSchema);

// Register the POST path for creating a new appointment
appointmentRegistry.registerPath({
  method: "post",
  path: "/api/appointments",
  summary: "Create a new appointment",
  tags: ["Appointment"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewAppointmentSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created appointment",
      content: {
        "application/json": {
          schema: AppointmentSchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all appointments
appointmentRegistry.registerPath({
  method: "get",
  path: "/api/appointments",
  summary: "Get all appointments",
  tags: ["Appointment"],
  responses: {
    200: {
      description: "A list of appointments",
      content: {
        "application/json": {
          schema: z.array(AppointmentSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving an appointment by ID
appointmentRegistry.registerPath({
  method: "get",
  path: "/api/appointments/{id}",
  summary: "Get an appointment by ID",
  tags: ["Appointment"],
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
      description: "The appointment with the specified ID",
      content: {
        "application/json": {
          schema: AppointmentSchema,
        },
      },
    },
    404: {
      description: "Appointment not found",
    },
  },
});

// Register the PATCH path for updating an appointment
appointmentRegistry.registerPath({
  method: "patch",
  path: "/api/appointments/{id}",
  summary: "Update an appointment",
  tags: ["Appointment"],
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
          schema: UpdateAppointmentSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated appointment",
      content: {
        "application/json": {
          schema: AppointmentSchema,
        },
      },
    },
    404: {
      description: "Appointment not found",
    },
  },
});

// Register the DELETE path for deleting an appointment
appointmentRegistry.registerPath({
  method: "delete",
  path: "/api/appointments/{id}",
  summary: "Delete an appointment",
  tags: ["Appointment"],
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
      description: "Appointment deleted successfully",
    },
    404: {
      description: "Appointment not found",
    },
  },
});
