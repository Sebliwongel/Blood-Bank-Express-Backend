import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewDonorSchema, UpdateDonorSchema } from "./donorSchema";
import { Request, Response } from "express";
import {
  createDonor,
  deleteDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
} from "./donorService";

// Create a new donor
export const createDonorController = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(NewDonorSchema, req);
    const newDonor = await createDonor(
      parsed.firstName,
      parsed.lastName,
      new Date(parsed.birthDate),
      parsed.age,
      parsed.gender,
      parsed.city,
      parsed.subCity,
      parsed.zone,
      parsed.woreda,
      parsed.kebele,
      parsed.email,
      parsed.password,
      parsed.username,
      parsed.bloodType,
      parsed.collectorId,
      parsed.systemAdminId,
      parsed.middleName,
      parsed.title,
      parsed.occupation,
      parsed.telephone,
      parsed.cellPhone,
      parsed.organization,
      parsed.poBox,
      parsed.medicalHistory
    );
    res.status(201).json(newDonor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create donor" });
  }
};

// Get all donors
export const getAllDonorController = async (req: Request, res: Response) => {
  try {
    const donors = await getAllDonors();
    res.status(200).json(donors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve donors" });
  }
};

// Get a donor by ID
export const getDonorByIdController = async (req: Request, res: Response) => {
  const donorId = req.params.id; // Assuming the ID is passed as a route parameter
  try {
    const donor = await getDonorById(parseInt(donorId));
    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.status(200).json(donor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve donor" });
  }
};

// Update a donor
export const updateDonorController = async (req: Request, res: Response) => {
  const donorId = req.params.id;
  try {
    const parsed = await validateAndParse(UpdateDonorSchema, req);
    const birthDate = parsed.birthDate ? new Date(parsed.birthDate) : undefined;
    const updatedDonor = await updateDonor(parseInt(donorId), { ...parsed, birthDate });
    if (!updatedDonor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.status(200).json(updatedDonor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update donor" });
  }
};

// Delete a donor
export const deleteDonorController = async (req: Request, res: Response) => {
  const donorId = req.params.id;
  try {
    const deleted = await deleteDonor(parseInt(donorId));
    if (!deleted) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete donor" });
  }
};
