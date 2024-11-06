import { Request, Response } from "express";
import {
  createInventory,
  getAllInventories,
  getInventoryById,
  updateInventory,
  deleteInventory,
} from "./InventoryService";  // Make sure this path matches your project structure

// Create a new inventory record
export const createInventoryController = async (req: Request, res: Response) => {
  const { name, bloodType, expirationDate, totalQuantity, bloodId } = req.body;

  try {
    // Validate that all required fields are provided
    if (!name || !bloodType || !expirationDate || !totalQuantity || !bloodId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create the new inventory record
    const newInventory = await createInventory(name, bloodType, new Date(expirationDate), totalQuantity, bloodId);
    
    // Return the created inventory record
    res.status(201).json(newInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create inventory." });
  }
};

// Get all inventory records
export const getAllInventoriesController = async (req: Request, res: Response) => {
  try {
    const inventories = await getAllInventories();
    res.status(200).json(inventories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve inventories." });
  }
};

// Get a single inventory record by ID
export const getInventoryByIdController = async (req: Request, res: Response) => {
  const inventoryId = parseInt(req.params.id);

  try {
    const inventory = await getInventoryById(inventoryId);

    if (!inventory) {
      return res.status(404).json({ error: "Inventory not found." });
    }

    res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve inventory." });
  }
};

// Update an existing inventory record by ID
export const updateInventoryController = async (req: Request, res: Response) => {
  const inventoryId = parseInt(req.params.id);
  const { name, bloodType, expirationDate, totalQuantity, bloodId } = req.body;

  try {
    // Call the service to update the inventory record
    const updatedInventory = await updateInventory(inventoryId, {
      name,
      bloodType,
      expirationDate: expirationDate ? new Date(expirationDate) : undefined,
      totalQuantity,
      bloodId,
    });

    if (!updatedInventory) {
      return res.status(404).json({ error: "Inventory not found." });
    }

    // Return the updated inventory record
    res.status(200).json(updatedInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update inventory." });
  }
};

// Delete an inventory record by ID
export const deleteInventoryController = async (req: Request, res: Response) => {
  const inventoryId = parseInt(req.params.id);

  try {
    const deletedInventory = await deleteInventory(inventoryId);

    if (!deletedInventory) {
      return res.status(404).json({ error: "Inventory not found." });
    }

    res.status(204).send();  // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete inventory." });
  }
};
