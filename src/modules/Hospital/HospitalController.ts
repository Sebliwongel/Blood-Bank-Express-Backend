import { Request, Response } from "express";
import { createHospital, updateHospital, getHospital, patchHospital, getAllHospitals, deleteHospital } from "./HospitalService";
import { z } from "zod";
import { CreateHospitalSchema, UpdateHospitalSchema, HospitalIdSchema } from "../Hospital/HospitalSchema";

// Types for request parameters
type CreateHospitalRequest = z.infer<typeof CreateHospitalSchema>;
type UpdateHospitalRequest = z.infer<typeof UpdateHospitalSchema>;
type HospitalIdParam = z.infer<typeof HospitalIdSchema>;

// Get all hospitals
export const getAllHospitalsController = async (_req: Request, res: Response) => {
  try {
    const hospitals = await getAllHospitals();
    res.status(200).json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ 
      error: "Failed to fetch hospitals",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Create a new hospital
export const createHospitalController = async (req: Request<{}, {}, CreateHospitalRequest>, res: Response) => {
  try {
    const newHospital = await createHospital(req.body);
    res.status(201).json(newHospital);
  } catch (error) {
    console.error("Error creating hospital:", error);
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return res.status(409).json({ 
        error: "Hospital already exists",
        details: "Username or email already in use"
      });
    }
    res.status(500).json({ 
      error: "Failed to create hospital",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Get a hospital by ID
export const getHospitalByIdController = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
  try {
    const hospitalId = parseInt(req.params.id);
    const hospital = await getHospital(hospitalId);

    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json(hospital);
  } catch (error) {
    console.error("Error fetching hospital:", error);
    res.status(500).json({ 
      error: "Failed to fetch hospital",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Update a hospital (full update)
export const updateHospitalController = async (
  req: Request<{ id: string }, {}, UpdateHospitalRequest>,
  res: Response
) => {
  try {
    const hospitalId = parseInt(req.params.id);
    const updatedHospital = await updateHospital(hospitalId, req.body);

    if (!updatedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json(updatedHospital);
  } catch (error) {
    console.error("Error updating hospital:", error);
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return res.status(409).json({ 
        error: "Update failed",
        details: "Username or email already in use"
      });
    }
    res.status(500).json({ 
      error: "Failed to update hospital",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Patch a hospital (partial update)
export const patchHospitalController = async (
  req: Request<{ id: string }, {}, Partial<UpdateHospitalRequest>>,
  res: Response
) => {
  try {
    const hospitalId = parseInt(req.params.id);
    const updatedHospital = await patchHospital(hospitalId, req.body);

    if (!updatedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json(updatedHospital);
  } catch (error) {
    console.error("Error patching hospital:", error);
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return res.status(409).json({ 
        error: "Update failed",
        details: "Username or email already in use"
      });
    }
    res.status(500).json({ 
      error: "Failed to patch hospital",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Delete a hospital
export const deleteHospitalController = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
  try {
    const hospitalId = parseInt(req.params.id);
    const deletedHospital = await deleteHospital(hospitalId);

    if (!deletedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    console.error("Error deleting hospital:", error);
    res.status(500).json({ 
      error: "Failed to delete hospital",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
