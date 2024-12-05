import { Request, Response } from "express";
import { validateAndParse } from "../../utils/validateAndParseRequest"; // Assuming you have this utility
import { NewBloodSchema, UpdateBloodSchema } from "./BloodSchema"; // Assuming these are your Zod schemas for validation
import { BloodInventoryService } from "./BloodService"; // Import from correct file

const bloodInventoryService = new BloodInventoryService();

// Create a new blood entry
export const createBloodController = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(NewBloodSchema, req);
    const newBlood = await bloodInventoryService.createBlood(parsed);

    res.status(201).json(newBlood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create blood record" });
  }
};

// Get all blood entries
export const getAllBloodController = async (req: Request, res: Response) => {
  try {
    const bloodRecords = await bloodInventoryService.getAllBloodInventory();

    res.status(200).json(bloodRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blood records" });
  }
};

// Get a blood entry by ID
export const getBloodByIdController = async (req: Request, res: Response) => {
  const bloodId = parseInt(req.params.id);

  try {
    const blood = await bloodInventoryService.getBloodById(bloodId);

    if (!blood) {
      return res.status(404).json({ error: "Blood record not found" });
    }

    res.status(200).json(blood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blood record" });
  }
};

// Update a blood entry by ID
export const updateBloodController = async (req: Request, res: Response) => {
  const bloodId = parseInt(req.params.id);

  try {
    const parsed = await validateAndParse(UpdateBloodSchema, req);
    const updatedBlood = await bloodInventoryService.updateBlood(bloodId, parsed);

    if (!updatedBlood) {
      return res.status(404).json({ error: "Blood record not found" });
    }

    res.status(200).json(updatedBlood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update blood record" });
  }
};

// Delete a blood entry by ID
export const deleteBloodController = async (req: Request, res: Response) => {
  const bloodId = parseInt(req.params.id);

  try {
    const deleted = await bloodInventoryService.deleteBlood(bloodId);

    if (!deleted) {
      return res.status(404).json({ error: "Blood record not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete blood record" });
  }
};
