import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AccessibleOpenAPIRegistry } from "../../utils/combineRegistries";
import { CollectionSchema, NewCollectionSchema, UpdateCollectionSchema } from "./CollectionSchema"; // Assuming collection schemas

export const collectionRegistry = new AccessibleOpenAPIRegistry();

// Register the CollectionSchemas
collectionRegistry.register("Collection", CollectionSchema);
collectionRegistry.register("NewCollection", NewCollectionSchema);

// Register the POST path for creating a collection
collectionRegistry.registerPath({
  method: "post",
  path: "/api/collection",
  summary: "Register a new collection",
  tags: ["Collection"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewCollectionSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "The created collection",
      content: {
        "application/json": {
          schema: CollectionSchema,
        },
      },
    },
  },
});

// Register the GET path for retrieving all collections
collectionRegistry.registerPath({
  method: "get",
  path: "/api/collection",
  summary: "Get all collections",
  tags: ["Collection"],
  responses: {
    200: {
      description: "A list of collections",
      content: {
        "application/json": {
          schema: z.array(CollectionSchema),
        },
      },
    },
  },
});

// Register the GET path for retrieving a collection by ID
collectionRegistry.registerPath({
  method: "get",
  path: "/api/collection/{id}",
  summary: "Get a collection by ID",
  tags: ["Collection"],
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
      description: "The collection with the specified ID",
      content: {
        "application/json": {
          schema: CollectionSchema,
        },
      },
    },
    404: {
      description: "Collection not found",
    },
  },
});

// Register the PATCH path for updating a collection
collectionRegistry.registerPath({
  method: "patch",
  path: "/api/collection/{id}",
  summary: "Update a collection",
  tags: ["Collection"],
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
          schema: UpdateCollectionSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated collection",
      content: {
        "application/json": {
          schema: CollectionSchema,
        },
      },
    },
    404: {
      description: "Collection not found",
    },
  },
});

// Register the DELETE path for deleting a collection
collectionRegistry.registerPath({
  method: "delete",
  path: "/api/collection/{id}",
  summary: "Delete a collection",
  tags: ["Collection"],
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
      description: "Collection deleted successfully",
    },
    404: {
      description: "Collection not found",
    },
  },
});
