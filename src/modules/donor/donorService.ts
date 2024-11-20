import { PrismaClient } from '@prisma/client';
import { NewDonorType, UpdateDonorType } from './donorSchema';  // Assuming you have the donorSchema set up as in the question

const prisma = new PrismaClient();

// Helper function to safely extract the error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

// Service for creating a new donor
export const createDonor = async (donorData: NewDonorType) => {
  try {
    const newDonor = await prisma.donor.create({
      data: donorData,
    });
    return newDonor;
  } catch (error) {
    throw new Error(`Failed to create donor: ${getErrorMessage(error)}`);
  }
};

// Service for fetching all donors
export const getAllDonors = async () => {
  try {
    const donors = await prisma.donor.findMany();
    return donors;
  } catch (error) {
    throw new Error(`Failed to fetch donors: ${getErrorMessage(error)}`);
  }
};

// Service for fetching a donor by ID
export const getDonorById = async (id: number) => {
  try {
    const donor = await prisma.donor.findUnique({
      where: { id },
    });
    if (!donor) throw new Error(`Donor with ID ${id} not found`);
    return donor;
  } catch (error) {
    throw new Error(`Failed to fetch donor: ${getErrorMessage(error)}`);
  }
};

// Service for fetching a donor by phone number
export const getDonorByPhoneNumber = async (phoneNumber: string) => {
  try {
    const donor = await prisma.donor.findFirst({
      where: {
        OR: [
          { telephone: phoneNumber },
          { cellPhone: phoneNumber },
        ],
      },
    });
    if (!donor) throw new Error(`Donor with phone number ${phoneNumber} not found`);
    return donor;
  } catch (error) {
    throw new Error(`Failed to fetch donor by phone number: ${getErrorMessage(error)}`);
  }
};

// Service for updating a donor
export const updateDonor = async (id: number, updatedData: UpdateDonorType) => {
  try {
    const updatedDonor = await prisma.donor.update({
      where: { id },
      data: updatedData,
    });
    return updatedDonor;
  } catch (error) {
    throw new Error(`Failed to update donor: ${getErrorMessage(error)}`);
  }
};

// Service for deleting a donor
export const deleteDonor = async (id: number) => {
  try {
    const deletedDonor = await prisma.donor.delete({
      where: { id },
    });
    return deletedDonor;
  } catch (error) {
    throw new Error(`Failed to delete donor: ${getErrorMessage(error)}`);
  }
};

// Service for patching (partial update) a donor
export const patchDonor = async (id: number, patchData: UpdateDonorType) => {
  try {
    const patchedDonor = await prisma.donor.update({
      where: { id },
      data: patchData,
    });
    return patchedDonor;
  } catch (error) {
    throw new Error(`Failed to patch donor: ${getErrorMessage(error)}`);
  }
};
