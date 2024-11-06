import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all Hospitals
export const getAllHospitals = async () => {
  return await prisma.hospital.findMany();
};

// Update a Hospital
export const updateHospital = async (
  hospitalId: number,
  updates: { 
    name?: string; 
    address?: string; 
    contactInfo?: string; 
    email?: string; 
    username?: string; 
    password?: string; 
  }
) => {
  // First, find the hospital by ID
  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
  });

  // If the hospital does not exist, return null or handle accordingly
  if (!hospital) {
    return null;
  }

  // Update the hospital with the provided fields
  return await prisma.hospital.update({
    where: { id: hospitalId },
    data: {
      name: updates.name !== undefined ? updates.name : hospital.name, // Preserve existing if not provided
      address: updates.address !== undefined ? updates.address : hospital.address, // Preserve existing if not provided
      contactInfo: updates.contactInfo !== undefined ? updates.contactInfo : hospital.contactInfo, // Preserve existing if not provided
      email: updates.email !== undefined ? updates.email : hospital.email, // Preserve existing if not provided
      username: updates.username !== undefined ? updates.username : hospital.username, // Preserve existing if not provided
      password: updates.password !== undefined ? updates.password : hospital.password, // Preserve existing if not provided
    },
  });
};

// Get a Hospital by ID
export const getHospitalById = async (id: number) => {
  return await prisma.hospital.findUnique({
    where: { id },
  });
};

// Create a new Hospital
export const createHospital = async (
  name: string,
  address: string,
  contactInfo: string,
  email: string,
  username: string,
  password: string
) => {
  return await prisma.hospital.create({
    data: {
      name,
      address,
      contactInfo,
      email,
      username,
      password,
    },
  });
};

// Delete a Hospital
export const deleteHospital = async (id: number) => {
  return await prisma.hospital.delete({
    where: { id },
  });
};
