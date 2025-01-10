import { prisma } from "./../../../prisma/prisma"; // Assuming prisma client is set up



// Function to save blood collection data
export const createBloodCollection = async (data: {
  donorId: number;
  bloodVolume: number;
  vitals: string;
  donationTime: Date;
  barcode: string;
}) => {
  try {
    const bloodCollection = await prisma.bloodCollection.create({
      data: {
        donorId: data.donorId,
        bloodVolume: data.bloodVolume,
        vitals: data.vitals,
        donationTime: data.donationTime,
        barcode: data.barcode,
      },
    });
    return bloodCollection;
  } catch (error: unknown) {
    // Check if error is an instance of Error and handle safely
    if (error instanceof Error) {
      throw new Error("Error saving blood collection: " + error.message);
    }
    // If the error is not an instance of Error, throw a generic message
    throw new Error("Unknown error occurred while saving blood collection.");
  }
};

