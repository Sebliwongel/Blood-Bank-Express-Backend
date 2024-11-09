import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllDonations = async () => {
  return await prisma.donation.findMany({
    include: {
      donor: true, // Optional: Include related Donor data
      blood: true, // Optional: Include related Blood data
    },
  });
};

export const getDonationById = async (id: number) => {
  return await prisma.donation.findUnique({
    where: { id },
    include: {
      donor: true, // Optional: Include related Donor data
      blood: true, // Optional: Include related Blood data
    },
  });
};

export const createDonation = async (
  donorId: number,
  bloodId: number,
  donationDate: Date
) => {
  return await prisma.donation.create({
    data: {
      donorId,
      bloodId,
      donationDate,
    },
  });
};

export const updateDonation = async (
  donationId: number,
  updates: { donorId?: number; bloodId?: number; donationDate?: Date }
) => {
  // First, find the donation by ID
  const donation = await prisma.donation.findUnique({
    where: { id: donationId },
  });

  // If the donation does not exist, return null or handle accordingly
  if (!donation) {
    return null;
  }

  // Update the donation with the provided fields
  return await prisma.donation.update({
    where: { id: donationId },
    data: {
      donorId: updates.donorId !== undefined ? updates.donorId : donation.donorId, // Preserve existing if not provided
      bloodId: updates.bloodId !== undefined ? updates.bloodId : donation.bloodId, // Preserve existing if not provided
      donationDate: updates.donationDate !== undefined ? updates.donationDate : donation.donationDate, // Preserve existing if not provided
    },
  });
};

export const deleteDonation = async (id: number) => {
  return await prisma.donation.delete({
    where: { id },
  });
};
