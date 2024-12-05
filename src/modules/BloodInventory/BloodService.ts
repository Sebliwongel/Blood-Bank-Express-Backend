import { PrismaClient, StorageStatus } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Define the Zod schema for new blood inventory records
export const NewBloodSchema = z.object({
  bloodType: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]), // Blood type validation
  quantity: z.number().min(1), // Quantity must be at least 1
  donationDate: z.string().transform((date) => new Date(date)), // Parse date strings into Date objects
  expirationDate: z.string().transform((date) => new Date(date)), // Parse expiration date
  storageStatus: z.nativeEnum(StorageStatus), // Use Prisma's StorageStatus enum
  donorId: z.number(), // Donor ID must be a number
  barcode: z.string(), // Barcode is a required string
});

// Define the Zod schema for updating blood inventory records
export const UpdateBloodSchema = z.object({
  bloodType: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).optional(),
  quantity: z.number().min(1).optional(),
  donationDate: z.string().transform((date) => new Date(date)).optional(),
  expirationDate: z.string().transform((date) => new Date(date)).optional(),
  storageStatus: z.nativeEnum(StorageStatus).optional(),
  donorId: z.number().optional(),
  barcode: z.string().optional(),
});

export class BloodInventoryService {
  // Create a new blood inventory record
  async createBlood(data: z.infer<typeof NewBloodSchema>) {
    try {
      const validatedData = NewBloodSchema.parse(data); // Validate input data
      const cleanData = this.cleanData(validatedData);

      // Use transaction to ensure data consistency
      return await prisma.$transaction(async (tx) => {
        // Check if blood with same barcode exists
        const existingBlood = await tx.bloodInventory.findUnique({
          where: { barcode: cleanData.barcode },
        });

        if (existingBlood) {
          throw new ValidationError(
            400,
            "Duplicate Entry",
            "Blood inventory with this barcode already exists"
          );
        }

        
     

        
      });
    } catch (error) {
      console.error("Error creating blood inventory:", error);
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new Error("Failed to create blood inventory record");
    }
  }

  // Fetch all blood inventory records
  async getAllBloodInventory() {
    try {
      const records = await prisma.bloodInventory.findMany({
        include: { donor: true }, // Include donor information if there's a relationship
      });
      console.log(`Retrieved ${records.length} blood inventory records`);
      return records;
    } catch (error) {
      console.error("Error fetching blood inventory records:", error);
      throw new Error("Failed to retrieve blood inventory records");
    }
  }

  // Fetch a single blood inventory record by ID
  async getBloodById(id: number) {
    try {
      const record = await prisma.bloodInventory.findUnique({
        where: { id },
        include: { donor: true }, // Include donor information
      });

      if (!record) {
        throw new ValidationError(404, "Not Found", `Blood inventory record with ID ${id} not found`);
      }

      console.log(`Retrieved blood inventory record: ${JSON.stringify(record)}`);
      return record;
    } catch (error) {
      console.error(`Error fetching blood inventory record ${id}:`, error);
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new Error("Failed to retrieve blood inventory record");
    }
  }

  // Update a blood inventory record by ID
  async updateBlood(id: number, data: z.infer<typeof UpdateBloodSchema>) {
    try {
      const validatedData = UpdateBloodSchema.parse(data);
      const cleanData = this.cleanData(validatedData);

      // Use transaction to ensure data consistency
      return await prisma.$transaction(async (tx) => {
        // Check if record exists
        const existingRecord = await tx.bloodInventory.findUnique({
          where: { id },
        });

        if (!existingRecord) {
          throw new ValidationError(404, "Not Found", `Blood inventory record with ID ${id} not found`);
        }

        // If barcode is being updated, check for duplicates
        if (cleanData.barcode) {
          const duplicateBarcode = await tx.bloodInventory.findFirst({
            where: {
              barcode: cleanData.barcode,
              id: { not: id }, // Exclude current record
            },
          });

          if (duplicateBarcode) {
            throw new ValidationError(
              400,
              "Duplicate Entry",
              "Blood inventory with this barcode already exists"
            );
          }
        }

        // Update the record
        const updatedRecord = await tx.bloodInventory.update({
          where: { id },
          data: cleanData,
        });

        console.log(`Updated blood inventory record: ${JSON.stringify(updatedRecord)}`);
        return updatedRecord;
      });
    } catch (error) {
      console.error(`Error updating blood inventory record ${id}:`, error);
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new Error("Failed to update blood inventory record");
    }
  }

  // Delete a blood inventory record by ID
  async deleteBlood(id: number) {
    try {
      // Check if record exists before deletion
      const existingRecord = await prisma.bloodInventory.findUnique({
        where: { id },
      });

      if (!existingRecord) {
        throw new ValidationError(404, "Not Found", `Blood inventory record with ID ${id} not found`);
      }

      const deletedRecord = await prisma.bloodInventory.delete({
        where: { id },
      });

      console.log(`Deleted blood inventory record: ${JSON.stringify(deletedRecord)}`);
      return deletedRecord;
    } catch (error) {
      console.error(`Error deleting blood inventory record ${id}:`, error);
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new Error("Failed to delete blood inventory record");
    }
  }

  // Fetch blood inventory by storage status
  async getBloodByStatus(status: StorageStatus) {
    try {
      const records = await prisma.bloodInventory.findMany({
        where: { storageStatus: status },
      });

      console.log(`Retrieved ${records.length} blood inventory records with status ${status}`);
      return records;
    } catch (error) {
      console.error(`Error fetching blood inventory records with status ${status}:`, error);
      throw new Error("Failed to retrieve blood inventory records by status");
    }
  }

  // Notify manager of blood units nearing expiration
  async getExpiringBlood(days: number) {
    try {
      if (days < 0) {
        throw new ValidationError(400, "Invalid Input", "Days parameter must be a positive number");
      }

      const currentDate = new Date();
      const thresholdDate = new Date();
      thresholdDate.setDate(currentDate.getDate() + days);

      const records = await prisma.bloodInventory.findMany({
        where: {
          expirationDate: {
            lte: thresholdDate,
            gte: currentDate,
          },
        },
      });

      console.log(`Found ${records.length} blood units expiring within ${days} days`);
      return records;
    } catch (error) {
      console.error("Error checking for expiring blood units:", error);
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new Error("Failed to check for expiring blood units");
    }
  }

  // Helper method to clean data before passing it to Prisma
  private cleanData(data: Record<string, any>) {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
  }
}

class ValidationError extends Error {
  constructor(public statusCode: number, public code: string, message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
