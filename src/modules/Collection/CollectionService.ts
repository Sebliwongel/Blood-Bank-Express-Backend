import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all collections
export const getAllCollections = async () => {
  return await prisma.collection.findMany();
};

// Get collection by ID
export const getCollectionById = async (id: number) => {
  return await prisma.collection.findUnique({
    where: { id },
  });
};

// Create a new collection
export const createCollection = async (bloodId: number, collectedDate: string) => {
  return await prisma.collection.create({
    data: {
      bloodId,
      collectedDate,
    },
  });
};

// Update a collection
export const updateCollection = async (
  collectionId: number,
  updates: { bloodId?: number; collectedDate?: string }
) => {
  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
  });

  if (!collection) {
    return null;
  }

  return await prisma.collection.update({
    where: { id: collectionId },
    data: {
      bloodId: updates.bloodId ?? collection.bloodId,
      collectedDate: updates.collectedDate ?? collection.collectedDate,
    },
  });
};

// Delete a collection
export const deleteCollection = async (id: number) => {
  return await prisma.collection.delete({
    where: { id },
  });
};
