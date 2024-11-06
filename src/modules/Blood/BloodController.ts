import { Request, Response } from "express";
import { validateAndParse } from "../../utils/validateAndParseRequest"; // Assuming you have this utility
import { NewBloodSchema, UpdateBloodSchema } from "./BloodSchema"; // Assuming these are your Zod schemas for validation
import {
  createBlood,
  deleteBlood,
  getAllBloods,
  getBloodById,
  updateBlood,
} from "./BloodService"; // Import your service layer

// Create a new blood entry
export const createBloodController = async (req: Request, res: Response) => {
  try {
    // Validate and parse request body using the NewBloodSchema
    const parsed = await validateAndParse(NewBloodSchema, req);
    
    // Call the service to create the blood entry
    const newBlood = await createBlood(parsed.bloodType, parsed.quantity, parsed.donationDate);
    
    // Send response with the created blood entry
    res.status(201).json(newBlood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create blood record" });
  }
};

// Get all blood entries
export const getAllBloodController = async (req: Request, res: Response) => {
  try {
    // Call the service to fetch all blood entries
    const bloodRecords = await getAllBloods();
    
    // Send response with the list of blood records
    res.status(200).json(bloodRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blood records" });
  }
};

// Get a blood entry by ID
export const getBloodByIdController = async (req: Request, res: Response) => {
  const bloodId = parseInt(req.params.id); // ID from route parameter
  
  try {
    // Call the service to fetch blood by ID
    const blood = await getBloodById(bloodId);
    
    if (!blood) {
      return res.status(404).json({ error: "Blood record not found" });
    }
    
    // Send response with the specific blood record
    res.status(200).json(blood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blood record" });
  }
};

// Update a blood entry by ID
export const updateBloodController = async (req: Request, res: Response) => {
  const bloodId = parseInt(req.params.id); // ID from route parameter
  
  try {
    // Validate and parse the update body using UpdateBloodSchema
    const parsed = await validateAndParse(UpdateBloodSchema, req);
    
    // Call the service to update the blood entry
    const updatedBlood = await updateBlood(bloodId, parsed);
    
    if (!updatedBlood) {
      return res.status(404).json({ error: "Blood record not found" });
    }
    
    // Send response with the updated blood record
    res.status(200).json(updatedBlood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update blood record" });
  }
};

// Delete a blood entry by ID
export const deleteBloodController = async (req: Request, res: Response) => {
  const bloodId = parseInt(req.params.id); // ID from route parameter
  
  try {
    // Call the service to delete the blood entry
    const deleted = await deleteBlood(bloodId);
    
    if (!deleted) {
      return res.status(404).json({ error: "Blood record not found" });
    }
    
    // No content response for successful deletion
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete blood record" });
  }
};
