import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to create a new system user
export const createSystemUser = async (data: {
  name: string;
  email: string;
  role: "MANAGER" | "COLLECTOR" | "SYSTEM_ADMIN";
  password: string;
}) => {
  return await prisma.systemUser.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
    },
  });
};

// Function to get all system users
export const getAllSystemUsers = async () => {
  return await prisma.systemUser.findMany({
    include: {
      collectedDonors: true, // Assuming a relation to Donors
      adminDonors: true, // Assuming another relation to Donors
      accounts: true, // Assuming accounts linked to system users
      notifications: true, // Assuming notifications linked to system users
    },
  });
};

// Function to get a system user by ID
export const getSystemUserById = async (id: number) => {
  return await prisma.systemUser.findUnique({
    where: { id },
    include: {
      collectedDonors: true,
      adminDonors: true,
      accounts: true,
      notifications: true,
    },
  });
};

// Function to update a system user
export const updateSystemUser = async (
  userId: number,
  updates: {
    name?: string;
    email?: string;
    role?: "MANAGER" | "COLLECTOR" | "SYSTEM_ADMIN";
    password?: string;
  }
) => {
  // First, find the system user by ID
  const systemUser = await prisma.systemUser.findUnique({
    where: { id: userId },
  });

  // If the system user does not exist, return null or handle accordingly
  if (!systemUser) {
    return null;
  }

  // Update the system user with the provided fields
  return await prisma.systemUser.update({
    where: { id: userId },
    data: {
      name: updates.name ?? systemUser.name,
      email: updates.email ?? systemUser.email,
      role: updates.role ?? systemUser.role,
      password: updates.password ?? systemUser.password,
    },
    include: {
      collectedDonors: true,
      adminDonors: true,
      accounts: true,
      notifications: true,
    },
  });
};

// Function to delete a system user by ID
export const deleteSystemUser = async (id: number) => {
  return await prisma.systemUser.delete({
    where: { id },
  });
};
