import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all inventory records
export const getAllInventories = async () => {
  return await prisma.inventory.findMany({
    include: {
      blood: true, // Include related blood information
    },
  });
};

// Get a specific inventory record by its ID
export const getInventoryById = async (id: number) => {
  return await prisma.inventory.findUnique({
    where: { id },
    include: {
      blood: true, // Include related blood information
    },
  });
};

// Create a new inventory record
export const createInventory = async (
  name: string,
  bloodType: string,
  expirationDate: Date,
  totalQuantity: number,
  bloodId: number
) => {
  return await prisma.inventory.create({
    data: {
      name,
      bloodType,
      expirationDate,
      totalQuantity,
      bloodId,
    },
  });
};

// Update an inventory record by ID
export const updateInventory = async (
  inventoryId: number,
  updates: {
    name?: string;
    bloodType?: string;
    expirationDate?: Date;
    totalQuantity?: number;
    bloodId?: number;
  }
) => {
  // Find the inventory record by ID first
  const inventory = await prisma.inventory.findUnique({
    where: { id: inventoryId },
  });

  // If the inventory record doesn't exist, return null
  if (!inventory) {
    return null;
  }

  // Update the inventory with the provided fields, or keep existing values if not provided
  return await prisma.inventory.update({
    where: { id: inventoryId },
    data: {
      name: updates.name !== undefined ? updates.name : inventory.name,
      bloodType: updates.bloodType !== undefined ? updates.bloodType : inventory.bloodType,
      expirationDate:
        updates.expirationDate !== undefined ? updates.expirationDate : inventory.expirationDate,
      totalQuantity: updates.totalQuantity !== undefined ? updates.totalQuantity : inventory.totalQuantity,
      bloodId: updates.bloodId !== undefined ? updates.bloodId : inventory.bloodId,
    },
  });
};

// Delete an inventory record by ID
export const deleteInventory = async (id: number) => {
  return await prisma.inventory.delete({
    where: { id },
  });
};
