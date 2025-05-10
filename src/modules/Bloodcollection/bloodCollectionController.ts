import { Request, Response } from "express";
import { createBloodCollection } from "./../Bloodcollection/bloodCollectionService";

export const handleBloodCollection = async (req: Request, res: Response) => {
  try {
    const { donorId, bloodVolume, vitals, donationTime, barcode } = req.body;

    // Validate required fields
    if (!donorId || !bloodVolume || !vitals || !donationTime || !barcode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Call the service to save blood collection data
    const bloodCollection = await createBloodCollection({
      donorId,
      bloodVolume,
      vitals,
      donationTime,
      barcode,
    });

    return res.status(201).json(bloodCollection); // Respond with the created data
  } catch (error) {
    console.error("Error processing blood collection:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
