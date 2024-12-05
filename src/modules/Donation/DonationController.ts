// import { validateAndParse } from "../../utils/validateAndParseRequest";
// import { NewDonationSchema, UpdateDonationSchema } from "./DonationSchema";
// import { Request, Response } from "express";
// import {
//   createDonation,
//   deleteDonation,
//   getAllDonations,
//   getDonationById,
//   updateDonation,
// } from "./DonationService";

// // Create a new donation
// export const createDonationController = async (req: Request, res: Response) => {
//   try {
//     const parsed = await validateAndParse(NewDonationSchema, req);
//     const { donorId, bloodId, donationDate } = parsed;
//     const newDonation = await createDonation(donorId, bloodId, donationDate);
//     res.status(201).json(newDonation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create donation" });
//   }
// };

// // Get all donations
// export const getAllDonationController = async (req: Request, res: Response) => {
//   try {
//     const donations = await getAllDonations();
//     res.status(200).json(donations);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to retrieve donations" });
//   }
// };

// // Get a donation by ID
// export const getDonationByIdController = async (req: Request, res: Response) => {
//   const donationId = req.params.id; // Assuming the ID is passed as a route parameter
//   try {
//     const donation = await getDonationById(parseInt(donationId));
//     if (!donation) {
//       return res.status(404).json({ error: "Donation not found" });
//     }
//     res.status(200).json(donation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to retrieve donation" });
//   }
// };

// // Update a donation
// export const updateDonationController = async (req: Request, res: Response) => {
//   const donationId = req.params.id;
//   try {
//     const parsed = await validateAndParse(UpdateDonationSchema, req);
//     const updatedDonation = await updateDonation(parseInt(donationId), parsed);
//     if (!updatedDonation) {
//       return res.status(404).json({ error: "Donation not found" });
//     }
//     res.status(200).json(updatedDonation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update donation" });
//   }
// };

// // Delete a donation
// export const deleteDonationController = async (req: Request, res: Response) => {
//   const donationId = req.params.id;
//   try {
//     const deleted = await deleteDonation(parseInt(donationId));
//     if (!deleted) {
//       return res.status(404).json({ error: "Donation not found" });
//     }
//     res.status(204).send(); // No content response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to delete donation" });
//   }
// };
