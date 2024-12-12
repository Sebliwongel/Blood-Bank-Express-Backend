import { PrismaClient } from "@prisma/client";
import { NewDonorType, UpdateDonorType } from "./donorSchema";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Helper function to safely extract the error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

// Helper function to map input data
const mapToDonorCreateInput = (data: NewDonorType): Prisma.DonorCreateInput => {
  return {
    ...data,
    birthDate: new Date(data.birthDate),
    PhoneNumber: data.PhoneNumber ?? "", // Ensure a default value for PhoneNumber if it's null or undefined
  };
};

// Service for creating a donor
export const createDonor = async (donorData: NewDonorType) => {
  try {
    const donorCreateInput = mapToDonorCreateInput(donorData);

    const hashedPassword = await bcrypt.hash(donorCreateInput.password, 10);
    const newDonor = await prisma.donor.create({
      data: {
        ...donorCreateInput,
        password: hashedPassword,
      },
    });
    return newDonor;
  } catch (error) {
    throw new Error(
      `Failed to create donor: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
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
    throw new Error(`Failed to fetch donor by ID: ${getErrorMessage(error)}`);
  }
};

// Service for fetching a donor by phone number
export const getDonorByPhoneNumber = async (phoneNumber: string) => {
  try {
    const donor = await prisma.donor.findFirst({
      where: { PhoneNumber: phoneNumber },
    });
    if (!donor)
      throw new Error(`Donor with phone number ${phoneNumber} not found`);
    return donor;
  } catch (error) {
    throw new Error(
      `Failed to fetch donor by phone number: ${getErrorMessage(error)}`
    );
  }
};

// Service for updating a donor
export const updateDonor = async (id: number, updatedData: UpdateDonorType) => {
  try {
    // Map the zod schema data to match Prisma's DonorUpdateInput
    const donorUpdateInput: any = {
      ...updatedData,
      birthDate: updatedData.birthDate
        ? new Date(updatedData.birthDate)
        : undefined, // Ensure birthDate is a Date object
    };

    const updatedDonor = await prisma.donor.update({
      where: { id },
      data: donorUpdateInput,
    });
    return updatedDonor;
  } catch (error) {
    throw new Error(
      `Failed to update donor: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
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
    // Map patchData to match Prisma's DonorUpdateInput type
    const donorUpdateInput: Prisma.DonorUpdateInput = {
      firstName: patchData.firstName,
      middleName: patchData.middleName,
      lastName: patchData.lastName,
      title: patchData.title,
      birthDate: patchData.birthDate
        ? new Date(patchData.birthDate)
        : undefined, // Handle date properly
      gender: patchData.gender,
      occupation: patchData.occupation,
      city: patchData.city,
      subCity: patchData.subCity,
      woreda: patchData.woreda,
      kebele: patchData.kebele,
      PhoneNumber: patchData.PhoneNumber ?? undefined,
      email: patchData.email,
      username: patchData.username,

      // Add any other properties that can be updated here
    };

    const patchedDonor = await prisma.donor.update({
      where: { id },
      data: donorUpdateInput,
    });

    return patchedDonor;
  } catch (error) {
    throw new Error(`Failed to patch donor: ${getErrorMessage(error)}`);
  }
};

export const getDonorByEmail = async (email: string) => {
  return await prisma.donor.findUnique({
    where: { email: email },
  });
};
