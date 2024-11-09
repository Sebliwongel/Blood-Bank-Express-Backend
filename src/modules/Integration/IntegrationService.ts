import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to create a new integration
export const createIntegration = async (hospitalId: number) => {
  return await prisma.integration.create({
    data: {
      hospitalId,
    },
    include: {
      inventories: true, // Includes related inventories
    },
  });
};

// Function to get all integrations
export const getAllIntegrations = async () => {
  return await prisma.integration.findMany({
    include: {
      hospital: true, // Includes related hospital data
      inventories: true, // Includes related inventories data
    },
  });
};

// Function to get an integration by ID
export const getIntegrationById = async (id: number) => {
  return await prisma.integration.findUnique({
    where: { id },
    include: {
      hospital: true,
      inventories: true,
    },
  });
};

// Function to update an integration
export const updateIntegration = async (
  integrationId: number,
  updates: { hospitalId?: number }
) => {
  // First, find the integration by ID
  const integration = await prisma.integration.findUnique({
    where: { id: integrationId },
  });

  // If the integration does not exist, return null or handle accordingly
  if (!integration) {
    return null;
  }

  // Update the integration with the provided fields
  return await prisma.integration.update({
    where: { id: integrationId },
    data: {
      hospitalId: updates.hospitalId ?? integration.hospitalId,
    },
    include: {
      hospital: true,
      inventories: true,
    },
  });
};

// Function to delete an integration by ID
export const deleteIntegration = async (id: number) => {
  return await prisma.integration.delete({
    where: { id },
  });
};
