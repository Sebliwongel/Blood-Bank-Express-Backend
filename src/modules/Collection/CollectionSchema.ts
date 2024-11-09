import { z } from "zod";

// New collection schema (used for creating a new collection)
export const NewCollectionSchema = z.object({
  bloodId: z.number().openapi({ example: 1 }),  // Foreign key to Blood
  collectedDate: z.string().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Date of collection
}).openapi("New Collection");

// Collection schema (used for retrieving and displaying collection details)
export const CollectionSchema = z.object({
  id: z.number().openapi({ example: 1 }),  // Unique identifier for the collection
  bloodId: z.number().openapi({ example: 1 }),  // Foreign key to Blood
  collectedDate: z.string().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Date of collection
  createdAt: z.string().openapi({ example: "2023-07-15T10:00:00.000Z" }), // When the collection record was created
  updatedAt: z.string().openapi({ example: "2023-07-15T10:00:00.000Z" }), // When the collection record was last updated
}).openapi("Collection");

// Update collection schema (used for updating a collection)
export const UpdateCollectionSchema = z.object({
  bloodId: z.number().optional().openapi({ example: 1 }), // Foreign key to Blood (optional)
  collectedDate: z.string().optional().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Optional date for updating collection
}).openapi("Update Collection");
