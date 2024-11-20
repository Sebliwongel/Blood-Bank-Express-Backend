import { Request, Response } from "express";
import {
  createQualification,
  getAllQualifications,
  getQualificationById,
  updateQualification,
  deleteQualification,
  checkQualificationStatus,
} from "./QulificationService";
import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewQualificationSchema, UpdateQualificationSchema } from "./QulificationSchema";

// Create a new qualification record
export const createQualificationController = async (req: Request, res: Response) => {
  try {
    // Validate and parse the request body using the schema
    const parsedData = await validateAndParse(NewQualificationSchema, req);

    // Convert lastDonationDate to Date if it's provided
    const lastDonationDate = parsedData.lastDonationDate ? new Date(parsedData.lastDonationDate) : undefined;

    // Create a new qualification record using the service function
    const newQualification = await createQualification(
      parsedData.donorId,
      parsedData.weight,
      parsedData.pulse,
      parsedData.hb,
      parsedData.bp,
      parsedData.temperature,
      lastDonationDate, // Pass the converted date
      parsedData.hasDonatedBefore,
      parsedData.hasTattooing,
      parsedData.hasEarPiercing,
      parsedData.hadDentalExtraction,
      parsedData.hasHeartDisease,
      parsedData.hasCancer,
      parsedData.hasDiabetes,
      parsedData.hasHepatitis,
      parsedData.hasSTD,
      parsedData.hadTyphoidLastYear,
      parsedData.hasLungDisease,
      parsedData.hasTuberculosis,
      parsedData.hasAllergies,
      parsedData.hasKidneyDisease,
      parsedData.hasEpilepsy,
      parsedData.hasAbnormalBleeding,
      parsedData.hadJaundiceLastYear,
      parsedData.hadMalariaSixMonths,
      parsedData.hasFaintingSpells,
      parsedData.takenAntibiotics,
      parsedData.takenSteroids,
      parsedData.takenAspirin,
      parsedData.hadVaccinations,
      parsedData.consumedAlcohol,
      parsedData.hadDogBiteVaccine,
      parsedData.hadSurgeryLastSixMonths,
      parsedData.hadBloodTransfusionLastSixMonths
    );

    // Check if the donor meets the qualification criteria
    const isQualified = checkQualificationStatus(newQualification);

    res.status(201).json({
      message: isQualified ? "You are qualified" : "You are not qualified",
      qualification: newQualification,
    });
  } catch (error) {
    console.error("Error creating qualification:", error);
    res.status(500).json({ error: "Failed to create qualification" });
  }
};

// Get all qualifications
export const getAllQualificationsController = async (req: Request, res: Response) => {
  try {
    const qualifications = await getAllQualifications();
    res.status(200).json(qualifications);
  } catch (error) {
    console.error("Error retrieving qualifications:", error);
    res.status(500).json({ error: "Failed to retrieve qualifications" });
  }
};

// Get a qualification by ID
export const getQualificationByIdController = async (req: Request, res: Response) => {
  const qualificationId = req.params.id;
  try {
    const qualification = await getQualificationById(parseInt(qualificationId));
    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.status(200).json(qualification);
  } catch (error) {
    console.error("Error retrieving qualification:", error);
    res.status(500).json({ error: "Failed to retrieve qualification" });
  }
};

// Update a qualification record
export const updateQualificationController = async (req: Request, res: Response) => {
  const qualificationId = req.params.id;
  try {
    // Validate and parse the request body using the schema
    const parsedData = await validateAndParse(UpdateQualificationSchema, req);

    // Convert lastDonationDate to Date if it's provided
    const lastDonationDate = parsedData.lastDonationDate ? new Date(parsedData.lastDonationDate) : undefined;

    const updatedQualification = await updateQualification(parseInt(qualificationId), {
      ...parsedData,
      lastDonationDate, // Pass the converted date
    });

    if (!updatedQualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }

    // Check if the donor meets the updated qualification criteria
    const isQualified = checkQualificationStatus(updatedQualification);

    res.status(200).json({
      message: isQualified ? "You are qualified" : "You are not qualified",
      qualification: updatedQualification,
    });
  } catch (error) {
    console.error("Error updating qualification:", error);
    res.status(500).json({ error: "Failed to update qualification" });
  }
};

// Delete a qualification record
export const deleteQualificationController = async (req: Request, res: Response) => {
  const qualificationId = req.params.id;
  try {
    const deleted = await deleteQualification(parseInt(qualificationId));
    if (!deleted) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error deleting qualification:", error);
    res.status(500).json({ error: "Failed to delete qualification" });
  }
};
