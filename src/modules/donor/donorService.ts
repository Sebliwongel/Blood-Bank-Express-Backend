import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllDonors = async () => {
  return await prisma.donor.findMany();
};

export const updateDonor = async (
  donorId: number,
  updates: { userId?: number; bloodType?: string }
) => {
  // First, find the donor by ID
  const donor = await prisma.donor.findUnique({
    where: { id: donorId },
  });

  // If the donor does not exist, return null or handle accordingly
  if (!donor) {
    return null;
  }

  // Update the donor with the provided fields
  return await prisma.donor.update({
    where: { id: donorId },
    data: {
      userId: updates.userId !== undefined ? updates.userId : donor.userId, // Preserve existing if not provided
      bloodType:
        updates.bloodType !== undefined ? updates.bloodType : donor.bloodType, // Preserve existing if not provided
    },
  });
};

export const getDonorById = async (id: number) => {
  return await prisma.donor.findUnique({
    where: { id },
  });
};

export const createDonor = async (userId: number, bloodType: string) => {
  return await prisma.donor.create({
    data: {
      userId,
      bloodType,
    },
  });
};

export const deleteDonor = async (id: number) => {
  return await prisma.donor.delete({
    where: { id },
  });
};
