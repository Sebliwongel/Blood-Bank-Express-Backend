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

interface CreateCollectionInput {
  bloodId: number;
  collectedDate: Date;
  COLLECTORId: number;
}

// Create a new collection
export const createCollection = async (input: CreateCollectionInput) => {
  try {
    // Validate that blood exists
    const blood = await prisma.blood.findUnique({
      where: { id: input.bloodId },
    });
    if (!blood) {
      throw new Error('Blood record not found');
    }

    // Create the collection with related data
    const collection = await prisma.collection.create({
      data: {
        COLLECTORId: input.COLLECTORId,
        bloodId: input.bloodId,
        collectedDate: input.collectedDate,
      },
      include: {
        blood: true,
      },
    });

    return {
      collection,
      message: 'Collection created successfully'
    };
  } catch (error: any) {
    console.error('Error creating collection:', error);
    if (error.message === 'Blood record not found') {
      throw error;
    }
    if (error.code === 'P2002') {
      throw new Error('Duplicate collection record');
    }
    throw new Error('Failed to create collection');
  }
};

interface UpdateCollectionInput {
  bloodId?: number;
  collectedDate?: Date;
}

// Update a collection
export const updateCollection = async (
  collectionId: number,
  updates: UpdateCollectionInput
) => {
  try {
    // Validate collection exists
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
    });

    if (!collection) {
      return {
        success: false,
        error: {
          code: "COLLECTION_NOT_FOUND",
          message: "Collection record not found",
          timestamp: new Date().toISOString()
        }
      };
    }

    // If bloodId is being updated, validate that the blood record exists
    if (updates.bloodId) {
      const blood = await prisma.blood.findUnique({
        where: { id: updates.bloodId },
      });
      if (!blood) {
        return {
          success: false,
          error: {
            code: "BLOOD_NOT_FOUND",
            message: "Blood record not found",
            timestamp: new Date().toISOString()
          }
        };
      }
    }

    // Update the collection with related data
    const updatedCollection = await prisma.collection.update({
      where: { id: collectionId },
      data: {
        bloodId: updates.bloodId ?? collection.bloodId,
        collectedDate: updates.collectedDate ?? collection.collectedDate,
      },
      include: {
        blood: {
          include: {
            inventory: true
          }
        }
      }
    });

    return {
      success: true,
      data: {
        collection: updatedCollection,
        timestamp: new Date().toISOString()
      },
      message: "Collection updated successfully"
    };

  } catch (error: any) {
    console.error("Error updating collection:", error);

    return {
      success: false,
      error: {
        code: "UPDATE_FAILED",
        message: "Failed to update collection",
        details: error.message,
        timestamp: new Date().toISOString()
      }
    };
  }
};

// Delete a collection
export const deleteCollection = async (id: number) => {
  try {
    const deletedCollection = await prisma.collection.delete({
      where: { id },
    });
    return {
      success: true,
      message: 'Collection deleted successfully',
      data: deletedCollection
    };
  } catch (error: any) {
    console.error("Error deleting collection:", error);
    return {
      success: false,
      error: {
        code: "DELETE_FAILED",
        message: "Failed to delete collection",
        details: error.message,
        timestamp: new Date().toISOString()
      }
    };
  }
};
