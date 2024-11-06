import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all blood entries
export const getAllBloods = async () => {
  return await prisma.blood.findMany({
    include: {
      inventory: true, // Include related inventory if needed
      collections: true, // Include related collections if needed
      donations: true, // Include related donations if needed
    },
  });
};

// Get a blood entry by ID
export const getBloodById = async (id: number) => {
  return await prisma.blood.findUnique({
    where: { id },
    include: {
      inventory: true, // Include related inventory if needed
      collections: true, // Include related collections if needed
      donations: true, // Include related donations if needed
    },
  });
};

// Create a new blood entry
export const createBlood = async (bloodType: string, quantity: number, donationDate: Date) => {
  return await prisma.blood.create({
    data: {
      bloodType,
      quantity,
      donationDate,
    },
  });
};

// Update a blood entry by ID
export const updateBlood = async (
  bloodId: number,
  updates: { bloodType?: string; quantity?: number; donationDate?: Date }
) => {
  // First, find the blood entry by ID
  const blood = await prisma.blood.findUnique({
    where: { id: bloodId },
  });

  // If the blood entry does not exist, return null or handle accordingly
  if (!blood) {
    return null;
  }

  // Update the blood entry with the provided fields
  return await prisma.blood.update({
    where: { id: bloodId },
    data: {
      bloodType: updates.bloodType !== undefined ? updates.bloodType : blood.bloodType, // Preserve existing if not provided
      quantity: updates.quantity !== undefined ? updates.quantity : blood.quantity, // Preserve existing if not provided
      donationDate: updates.donationDate !== undefined ? updates.donationDate : blood.donationDate, // Preserve existing if not provided
    },
  });
};

// Delete a blood entry by ID
export const deleteBlood = async (id: number) => {
  return await prisma.blood.delete({
    where: { id },
  });
};
