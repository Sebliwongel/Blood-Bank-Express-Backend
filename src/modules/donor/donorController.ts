import { Request, Response, NextFunction } from 'express';
import { createDonor, getAllDonors, getDonorById, getDonorByPhoneNumber, updateDonor, deleteDonor, patchDonor } from './donorService'; // Assuming service functions are available

// Controller for creating a new donor
export const createDonorHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const donorData = req.body;  // Ensure to validate with schema before calling service
    const newDonor = await createDonor(donorData);
    res.status(201).json(newDonor);
  } catch (error) {
    next(error);  // Pass error to global error handler
  }
};

// Controller for getting all donors
export const getAllDonorsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const donors = await getAllDonors();
    res.status(200).json(donors);
  } catch (error) {
    next(error);
  }
};

// Controller for getting a donor by ID
export const getDonorByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const donorId = parseInt(req.params.id, 10);
    const donor = await getDonorById(donorId);
    res.status(200).json(donor);
  } catch (error) {
    next(error);
  }
};

// Controller for getting a donor by phone number
export const getDonorByPhoneNumberHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    const donor = await getDonorByPhoneNumber(phoneNumber);
    res.status(200).json(donor);
  } catch (error) {
    next(error);
  }
};

// Controller for updating a donor
export const updateDonorHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const donorId = parseInt(req.params.id, 10);
    const updatedData = req.body;  // Ensure you validate the body with schema
    const updatedDonor = await updateDonor(donorId, updatedData);
    res.status(200).json(updatedDonor);
  } catch (error) {
    next(error);
  }
};

// Controller for deleting a donor
export const deleteDonorHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const donorId = parseInt(req.params.id, 10);
    await deleteDonor(donorId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Controller for patching (partial update) a donor
export const patchDonorHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const donorId = parseInt(req.params.id, 10);
    const patchData = req.body;  // Ensure you validate the body
    const patchedDonor = await patchDonor(donorId, patchData);
    res.status(200).json(patchedDonor);
  } catch (error) {
    next(error);
  }
};
