import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { DonationSchema, NewDonationSchema, UpdateDonationSchema } from "./DonationSchema"; // Import donation schemas

export const donationRegistry = new AccessibleOpenAPIRegistry();

donationRegistry.register("Donation", DonationSchema);
donationRegistry.register("NewDonation", NewDonationSchema);

// Register the POST path for creating a donation
donationRegistry.registerPath({
  method: "post",
  path: "/api/donation",
  summary: "Create a new donation",
  tags: ["Donation"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewDonationSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created donation",
      content: {
        "application/json": {
          schema: DonationSchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all donations
donationRegistry.registerPath({
  method: "get",
  path: "/api/donation",
  summary: "Get all donations",
  tags: ["Donation"],
  responses: {
    200: {
      description: "A list of donations",
      content: {
        "application/json": {
          schema: z.array(DonationSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving a donation by ID
donationRegistry.registerPath({
  method: "get",
  path: "/api/donation/{id}",
  summary: "Get a donation by ID",
  tags: ["Donation"],
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
      description: "The donation with the specified ID",
      content: {
        "application/json": {
          schema: DonationSchema,
        },
      },
    },
    404: {
      description: "Donation not found",
    },
  },
});

// Register the PATCH path for updating a donation
donationRegistry.registerPath({
  method: "patch",
  path: "/api/donation/{id}",
  summary: "Update a donation",
  tags: ["Donation"],
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
          schema: UpdateDonationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated donation",
      content: {
        "application/json": {
          schema: DonationSchema,
        },
      },
    },
    404: {
      description: "Donation not found",
    },
  },
});

// Register the DELETE path for deleting a donation
donationRegistry.registerPath({
  method: "delete",
  path: "/api/donation/{id}",
  summary: "Delete a donation",
  tags: ["Donation"],
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
      description: "Donation deleted successfully",
    },
    404: {
      description: "Donation not found",
    },
  },
});
