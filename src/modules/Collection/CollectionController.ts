import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewCollectionSchema, UpdateCollectionSchema } from "./CollectionSchema";
import { Request, Response } from "express";
import {
  createCollection,
  deleteCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
} from "./CollectionService";

// Create a new collection
export const createCollectionController = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(NewCollectionSchema, req);
    const newCollection = await createCollection(parsed.bloodId, parsed.collectedDate);
    res.status(201).json(newCollection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create collection" });
  }
};

// Get all collections
export const getAllCollectionController = async (req: Request, res: Response) => {
  try {
    const collections = await getAllCollections();
    res.status(200).json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve collections" });
  }
};

// Get a collection by ID
export const getCollectionByIdController = async (req: Request, res: Response) => {
  const collectionId = req.params.id;
  try {
    const collection = await getCollectionById(parseInt(collectionId));
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve collection" });
  }
};

// Update a collection
export const updateCollectionController = async (req: Request, res: Response) => {
  const collectionId = req.params.id;
  try {
    const parsed = await validateAndParse(UpdateCollectionSchema, req);
    const updatedCollection = await updateCollection(parseInt(collectionId), parsed);
    if (!updatedCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json(updatedCollection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update collection" });
  }
};

// Delete a collection
export const deleteCollectionController = async (req: Request, res: Response) => {
  const collectionId = req.params.id;
  try {
    const deleted = await deleteCollection(parseInt(collectionId));
    if (!deleted) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete collection" });
  }
};
