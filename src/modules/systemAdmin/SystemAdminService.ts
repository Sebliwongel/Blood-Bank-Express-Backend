import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all System Admins
export const getAllSystemAdmins = async () => {
  return await prisma.systemAdmin.findMany({
    include: {
      accounts: true,        // Include accounts associated with the system admin
      notifications: true,   // Include notifications associated with the system admin
    },
  });
};

// Get a System Admin by ID
export const getSystemAdminById = async (id: number) => {
  return await prisma.systemAdmin.findUnique({
    where: { id },
    include: {
      accounts: true,        // Include accounts associated with the system admin
      notifications: true,   // Include notifications associated with the system admin
    },
  });
};

// Create a new System Admin
export const createSystemAdmin = async (username: string) => {
  return await prisma.systemAdmin.create({
    data: {
      username,
    },
  });
};

// Update a System Admin's details (e.g., username)
export const updateSystemAdmin = async (
  systemAdminId: number,
  updates: { username?: string }
) => {
  // First, find the system admin by ID
  const systemAdmin = await prisma.systemAdmin.findUnique({
    where: { id: systemAdminId },
  });

  // If the system admin does not exist, return null or handle accordingly
  if (!systemAdmin) {
    return null;
  }

  // Update the system admin with the provided fields
  return await prisma.systemAdmin.update({
    where: { id: systemAdminId },
    data: {
      username: updates.username !== undefined ? updates.username : systemAdmin.username, // Preserve existing if not provided
    },
  });
};

// Delete a System Admin
export const deleteSystemAdmin = async (id: number) => {
  return await prisma.systemAdmin.delete({
    where: { id },
  });
};
