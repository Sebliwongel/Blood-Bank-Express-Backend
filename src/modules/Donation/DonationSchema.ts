// import { z } from "zod";

// // New Donation Schema (for creating new donations)
// export const NewDonationSchema = z
//   .object({
//     donorId: z.number().openapi({ example: 1 }), // Reference to the Donor
//     bloodId: z.number().openapi({ example: 1 }), // Reference to the Blood
//     donationDate: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Date of donation
//   })
//   .openapi("New Donation");

// // Donation Schema (for fetching existing donation records)
// export const DonationSchema = z
//   .object({
//     id: z.number().openapi({ example: 1 }), // Donation ID
//     donorId: z.number().openapi({ example: 1 }), // Reference to the Donor
//     bloodId: z.number().openapi({ example: 1 }), // Reference to the Blood
//     donationDate: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Date of donation
//     createdAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Record creation timestamp
//     updatedAt: z.date().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Record update timestamp
//   })
//   .openapi("Donation");

// // Update Donation Schema (for updating donation details)
// export const UpdateDonationSchema = z
//   .object({
//     donorId: z.number().optional().openapi({ example: 1 }), // Optional field for Donor ID
//     bloodId: z.number().optional().openapi({ example: 1 }), // Optional field for Blood ID
//     donationDate: z.date().optional().openapi({ example: "2023-07-15T10:00:00.000Z" }), // Optional field for Donation Date
//   })
//   .openapi("Update Donation");
