import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewDonorSchema } from "./donorSchema";
import { Request, Response } from "express";
import { createDonor } from "./donorService";

export const createDonorController = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(NewDonorSchema, req);
    const newDonor = await createDonor(parsed.userId, parsed.bloodType);
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};
