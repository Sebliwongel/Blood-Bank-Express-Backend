import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all donors
export const getAllDonors = async () => {
  return await prisma.donor.findMany({
    include: {
      collector: true,
      systemAdmin: true,
      notifications: true,
      appointments: true,
      donations: true,
    },
  });
};

// Update donor
export const updateDonor = async (
  donorId: number,
  updates: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    title?: string;
    birthDate?: Date;
    age?: number;
    gender?: string;
    occupation?: string;
    city?: string;
    subCity?: string;
    zone?: string;
    woreda?: string;
    kebele?: string;
    telephone?: string;
    cellPhone?: string;
    organization?: string;
    email?: string;
    password?: string;
    username?: string;
    poBox?: string;
    bloodType?: string;
    medicalHistory?: string;
    collectorId?: number;
    systemAdminId?: number;
  }
) => {
  // Find the donor by ID
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
    data: updates,
  });
};

// Get donor by ID
export const getDonorById = async (id: number) => {
  return await prisma.donor.findUnique({
    where: { id },
    include: {
      collector: true,
      systemAdmin: true,
      notifications: true,
      appointments: true,
      donations: true,
    },
  });
};

// Create a new donor
export const createDonor = async (
  firstName: string,
  lastName: string,
  birthDate: Date,
  age: number,
  gender: string,
  city: string,
  subCity: string,
  zone: string,
  woreda: string,
  kebele: string,
  email: string,
  password: string,
  username: string,
  bloodType: string,
  collectorId?: number,
  systemAdminId?: number,
  middleName?: string,
  title?: string,
  occupation?: string,
  telephone?: string,
  cellPhone?: string,
  organization?: string,
  poBox?: string,
  medicalHistory?: string
) => {
  return await prisma.donor.create({
    data: {
      firstName,
      middleName,
      lastName,
      title,
      birthDate,
      age,
      gender,
      occupation,
      city,
      subCity,
      zone,
      woreda,
      kebele,
      telephone,
      cellPhone,
      organization,
      email,
      password,
      username,
      poBox,
      bloodType,
      medicalHistory,
      collectorId,
      systemAdminId,
    },
  });
};

// Delete a donor
export const deleteDonor = async (id: number) => {
  return await prisma.donor.delete({
    where: { id },
  });
};
