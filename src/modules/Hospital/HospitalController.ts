import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewHospitalSchema, UpdateHospitalSchema } from "./HospitalSchema";
import { Request, Response } from "express";
import {
  createHospital,
  deleteHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
} from "./HospitalService";

// Create a new hospital
export const createHospitalController = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(NewHospitalSchema, req);
    const newHospital = await createHospital(
      parsed.name,
      parsed.address,
      parsed.contactInfo,
      parsed.email,
      parsed.username,
      parsed.password
    );
    res.status(201).json(newHospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create hospital" });
  }
};

// Get all hospitals
export const getAllHospitalsController = async (req: Request, res: Response) => {
  try {
    const hospitals = await getAllHospitals();
    res.status(200).json(hospitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve hospitals" });
  }
};

// Get a hospital by ID
export const getHospitalByIdController = async (req: Request, res: Response) => {
  const hospitalId = req.params.id; // Assuming the ID is passed as a route parameter
  try {
    const hospital = await getHospitalById(parseInt(hospitalId));
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    res.status(200).json(hospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve hospital" });
  }
};

// Update a hospital
export const updateHospitalController = async (req: Request, res: Response) => {
  const hospitalId = req.params.id;
  try {
    const parsed = await validateAndParse(UpdateHospitalSchema, req);
    const updatedHospital = await updateHospital(parseInt(hospitalId), parsed);
    if (!updatedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    res.status(200).json(updatedHospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update hospital" });
  }
};

// Delete a hospital
export const deleteHospitalController = async (req: Request, res: Response) => {
  const hospitalId = req.params.id;
  try {
    const deleted = await deleteHospital(parseInt(hospitalId));
    if (!deleted) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete hospital" });
  }
};
