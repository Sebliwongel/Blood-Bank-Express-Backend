import { PrismaClient, Prisma, BloodType, StorageStatus } from "@prisma/client";
import { NewBloodSchema, UpdateBloodSchema } from "./BloodSchema"; // Assuming these schemas exist for validation
import { z } from "zod";

const prisma = new PrismaClient();

// Helper function to get a detailed error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

// Helper function to map the input to Prisma's Create Input format
const mapToBloodCreateInput = (data: z.infer<typeof NewBloodSchema>): Prisma.BloodInventoryCreateInput => {
  return {
    bloodType: data.bloodType as BloodType,
    quantity: data.quantity,
    barcode: data.barcode,
    donationDate: data.donationDate, // No transformation needed as it is now a string
    expirationDate: data.expirationDate, // No transformation needed as it is now a string
    storageStatus: data.storageStatus as StorageStatus || StorageStatus.AVAILABLE,
    donor: {
      connect: { id: data.donorId },
    },
  };
};

// Helper function to map input for updating BloodInventory
const mapToBloodUpdateInput = (data: z.infer<typeof UpdateBloodSchema>): Prisma.BloodInventoryUpdateInput => {
  return {
    bloodType: data.bloodType as BloodType,
    quantity: data.quantity,
    barcode: data.barcode,
    donationDate: data.donationDate || undefined, // Keep as string or undefined
    expirationDate: data.expirationDate || undefined, // Keep as string or undefined
    storageStatus: data.storageStatus as StorageStatus,
    donor: data.donorId ? { connect: { id: data.donorId } } : undefined,
  };
};

// Create a new blood inventory record
export const createBlood = async (bloodData: z.infer<typeof NewBloodSchema>) => {
  try {
    const bloodCreateInput = mapToBloodCreateInput(bloodData);

    // Check if a blood inventory with the same barcode already exists
    const existingBlood = await prisma.bloodInventory.findUnique({
      where: { barcode: bloodCreateInput.barcode },
    });

    if (existingBlood) {
      throw new Error(`Blood inventory with barcode ${bloodCreateInput.barcode} already exists`);
    }

    const newBlood = await prisma.bloodInventory.create({
      data: bloodCreateInput,
    });

    return newBlood;
  } catch (error) {
    throw new Error(`Failed to create blood inventory: ${getErrorMessage(error)}`);
  }
};

// Get all blood inventory records
export const getAllBloods = async () => {
  try {
    const bloods = await prisma.bloodInventory.findMany();
    return bloods;
  } catch (error) {
    throw new Error(`Failed to fetch blood inventory records: ${getErrorMessage(error)}`);
  }
};

// Get a single blood inventory record by ID
export const getBloodById = async (id: number) => {
  try {
    const blood = await prisma.bloodInventory.findUnique({
      where: { id },
      include: {
        donor: true,
        hospital: true,
        collector: true,
        integration: true,
      },
    });

    if (!blood) {
      throw new Error(`Blood inventory with ID ${id} not found`);
    }

    return blood;
  } catch (error) {
    throw new Error(`Failed to fetch blood inventory by ID: ${getErrorMessage(error)}`);
  }
};

// Get a single blood inventory record by barcode
export const getBloodByBarcode = async (barcode: string) => {
  try {
    const blood = await prisma.bloodInventory.findFirst({
      where: { barcode },
      include: {
        donor: true,
        hospital: true,
        collector: true,
        integration: true,
      },
    });

    if (!blood) {
      throw new Error(`Blood inventory with barcode ${barcode} not found`);
    }

    return blood;
  } catch (error) {
    throw new Error(`Failed to fetch blood inventory by barcode: ${getErrorMessage(error)}`);
  }
};

// Update an existing blood inventory record
export const updateBlood = async (id: number, updatedData: z.infer<typeof UpdateBloodSchema>) => {
  try {
    const bloodUpdateInput = mapToBloodUpdateInput(updatedData);

    const updatedBlood = await prisma.bloodInventory.update({
      where: { id },
      data: bloodUpdateInput,
    });

    return updatedBlood;
  } catch (error) {
    throw new Error(`Failed to update blood inventory: ${getErrorMessage(error)}`);
  }
};

// Delete a blood inventory record
export const deleteBlood = async (id: number) => {
  try {
    const deletedBlood = await prisma.bloodInventory.delete({
      where: { id },
    });
    return deletedBlood;
  } catch (error) {
    throw new Error(`Failed to delete blood inventory: ${getErrorMessage(error)}`);
  }
};

// Patch (partial update) a blood inventory record
export const patchBlood = async (id: number, patchData: z.infer<typeof UpdateBloodSchema>) => {
  try {
    const bloodUpdateInput = mapToBloodUpdateInput(patchData);

    const patchedBlood = await prisma.bloodInventory.update({
      where: { id },
      data: bloodUpdateInput,
    });

    return patchedBlood;
  } catch (error) {
    throw new Error(`Failed to patch blood inventory: ${getErrorMessage(error)}`);
  }
};
