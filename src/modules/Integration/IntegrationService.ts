import { PrismaClient, IntegrationStatus } from "@prisma/client";
import { NewIntegrationSchema, UpdateIntegrationSchema } from "./IntegrationSchema";

const prisma = new PrismaClient();

// Function to create a new integration
export const createIntegration = async (hospitalId: number) => {
  // Validate the data (hospitalId) using the NewIntegrationSchema if necessary
  try {
    NewIntegrationSchema.parse({ hospitalId });
    
    // Create the new integration
    return await prisma.integration.create({
      data: {
        hospitalId,
        status: IntegrationStatus.PENDING, // Default to PENDING status
      },
      include: {
        hospital: true, // Includes related hospital data
        bloodInventories: true, // Includes related blood inventories if any
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Ensure the error is an instance of Error, and access the message
      throw new Error(`Failed to create integration: ${error.message}`);
    } else {
      // In case the error is not an instance of Error, handle appropriately
      throw new Error("An unknown error occurred while creating the integration.");
    }
  }
};

// Function to get all integrations
export const getAllIntegrations = async () => {
  return await prisma.integration.findMany({
    include: {
      hospital: true, // Includes related hospital data
      bloodInventories: true, // Includes related blood inventories data
    },
  });
};

// Function to get an integration by ID
export const getIntegrationById = async (id: number) => {
  return await prisma.integration.findUnique({
    where: { id },
    include: {
      hospital: true,
      bloodInventories: true, // Include blood inventories related to the integration
    },
  });
};

// Function to update an integration
export const updateIntegration = async (
  integrationId: number,
  updates: { hospitalId?: number; status?: IntegrationStatus; managerComment?: string }
) => {
  try {
    // Validate the updates (e.g., status) using UpdateIntegrationSchema if necessary
    UpdateIntegrationSchema.parse(updates);

    // Find the integration by ID
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
        status: updates.status ?? integration.status,
        managerComment: updates.managerComment ?? integration.managerComment,
      },
      include: {
        hospital: true,
        bloodInventories: true, // Include updated inventories if necessary
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Ensure the error is an instance of Error, and access the message
      throw new Error(`Failed to update integration: ${error.message}`);
    } else {
      // In case the error is not an instance of Error, handle appropriately
      throw new Error("An unknown error occurred while updating the integration.");
    }
  }
};

// Function to delete an integration by ID
export const deleteIntegration = async (id: number) => {
  // First, ensure that the integration exists and handle if necessary
  const integration = await prisma.integration.findUnique({
    where: { id },
  });

  if (!integration) {
    throw new Error(`Integration with ID ${id} not found`);
  }

  // Delete the integration
  return await prisma.integration.delete({
    where: { id },
  });
};

// Function to approve an integration request
export const approveIntegration = async (integrationId: number, managerId: number, comment: string) => {
  // Update the integration to "APPROVED" status with a comment from the manager
  return await prisma.integration.update({
    where: { id: integrationId },
    data: {
      status: IntegrationStatus.APPROVED,
      managerId,
      managerComment: comment,
    },
    include: {
      hospital: true,
      bloodInventories: true, // Ensure related blood inventories are included if needed
    },
  });
};

// Function to decline an integration request
export const declineIntegration = async (integrationId: number, managerId: number, comment: string) => {
  // Update the integration to "DECLINED" status with a comment from the manager
  return await prisma.integration.update({
    where: { id: integrationId },
    data: {
      status: IntegrationStatus.REJECTED,
      managerId,
      managerComment: comment,
    },
    include: {
      hospital: true,
      bloodInventories: true, // Ensure related blood inventories are included if needed
    },
  });
};
