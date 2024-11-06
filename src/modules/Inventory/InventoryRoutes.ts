import { Router } from "express";
import {
  createInventoryController,
  getAllInventoriesController,
  getInventoryByIdController,
  updateInventoryController,
  deleteInventoryController,
} from "./InventroyController";  // Make sure this path matches your project structure

const router = Router();

// POST: Create a new inventory
router.post("/inventory", createInventoryController);

// GET: Get all inventories
router.get("/inventory", getAllInventoriesController);

// GET: Get an inventory by ID
router.get("/inventory/:id", getInventoryByIdController);

// PATCH: Update an inventory by ID
router.patch("/inventory/:id", updateInventoryController);

// DELETE: Delete an inventory by ID
router.delete("/inventory/:id", deleteInventoryController);

export default router;
