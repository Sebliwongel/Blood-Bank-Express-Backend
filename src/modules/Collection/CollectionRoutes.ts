import express from "express";
import {
  createCollectionController,
  getAllCollectionController,
  getCollectionByIdController,
  updateCollectionController,
  deleteCollectionController,
} from "./CollectionController"; // Assuming controllers are in the collectionController file

const router = express.Router();

// Route to create a new collection
router.post("/api/collection", createCollectionController);

// Route to get all collections
router.get("/api/collection", getAllCollectionController);

// Route to get a collection by ID
router.get("/api/collection/:id", getCollectionByIdController);

// Route to update a collection by ID
router.patch("/api/collection/:id", updateCollectionController);

// Route to delete a collection by ID
router.delete("/api/collection/:id", deleteCollectionController);

export default router;
