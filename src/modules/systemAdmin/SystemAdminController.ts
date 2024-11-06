import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewSystemAdminSchema, UpdateSystemAdminSchema } from "./systemAdminSchema";
import { Request, Response } from "express";
import {
  createSystemAdmin,
  deleteSystemAdmin,
  getAllSystemAdmins,
  getSystemAdminById,
  updateSystemAdmin,
} from "./SystemAdminService";

// Create a new system admin
export const createSystemAdminController = async (req: Request, res: Response) => {
  try {
    // Parse the request body based on the NewSystemAdminSchema
    const parsed = await validateAndParse(NewSystemAdminSchema, req);
    
    // Call service to create a new system admin using the parsed username
    const newSystemAdmin = await createSystemAdmin(parsed.username);
    
    // Send the created system admin as a response
    res.status(201).json(newSystemAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create system admin" });
  }
};

// Get all system admins
export const getAllSystemAdminsController = async (req: Request, res: Response) => {
  try {
    // Call service to retrieve all system admins
    const systemAdmins = await getAllSystemAdmins();
    
    // Return all system admins in the response
    res.status(200).json(systemAdmins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve system admins" });
  }
};

// Get a system admin by ID
export const getSystemAdminByIdController = async (req: Request, res: Response) => {
  const systemAdminId = req.params.id; // Get system admin ID from route parameters
  try {
    // Call service to retrieve the system admin by ID
    const systemAdmin = await getSystemAdminById(parseInt(systemAdminId));
    
    // If no system admin is found, return a 404 error
    if (!systemAdmin) {
      return res.status(404).json({ error: "System admin not found" });
    }
    
    // Return the found system admin
    res.status(200).json(systemAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve system admin" });
  }
};

// Update a system admin
export const updateSystemAdminController = async (req: Request, res: Response) => {
  const systemAdminId = req.params.id; // Get system admin ID from route parameters
  try {
    // Parse the request body based on UpdateSystemAdminSchema
    const parsed = await validateAndParse(UpdateSystemAdminSchema, req);
    
    // Call service to update the system admin with the parsed data
    const updatedSystemAdmin = await updateSystemAdmin(parseInt(systemAdminId), parsed);
    
    // If no system admin is found, return a 404 error
    if (!updatedSystemAdmin) {
      return res.status(404).json({ error: "System admin not found" });
    }
    
    // Return the updated system admin
    res.status(200).json(updatedSystemAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update system admin" });
  }
};

// Delete a system admin
export const deleteSystemAdminController = async (req: Request, res: Response) => {
  const systemAdminId = req.params.id; // Get system admin ID from route parameters
  try {
    // Call service to delete the system admin by ID
    const deleted = await deleteSystemAdmin(parseInt(systemAdminId));
    
    // If no system admin is found, return a 404 error
    if (!deleted) {
      return res.status(404).json({ error: "System admin not found" });
    }
    
    // Return a 204 No Content status for successful deletion
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete system admin" });
  }
};
