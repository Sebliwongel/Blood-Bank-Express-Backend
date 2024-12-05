// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// interface PaginationParams {
//   page?: number;
//   limit?: number;
// }

// interface CreateDonationInput {
//   donorId: number;
//   bloodId: number;
//   donationDate: Date;
// }

// export const getAllDonations = async ({ page = 1, limit = 10 }: PaginationParams = {}) => {
//   try {
//     const skip = (page - 1) * limit;
    
//     const [donations, total] = await Promise.all([
//       prisma.donation.findMany({
//         skip,
//         take: limit,
//         include: {
//           donor: true,
//           blood: true,
//         },
//         orderBy: {
//           createdAt: 'desc',
//         },
//       }),
//       prisma.donation.count(),
//     ]);

//     return {
//       donations,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching donations:', error);
//     throw error;
//   }
// };

// export const getDonationById = async (id: number) => {
//   try {
//     const donation = await prisma.donation.findUnique({
//       where: { id },
//       include: {
//         donor: true,
//         blood: true,
//       },
//     });

//     if (!donation) {
//       return null;
//     }

//     return {
//       donation,
//       message: 'Donation retrieved successfully'
//     };
//   } catch (error) {
//     console.error('Error fetching donation:', error);
//     throw error;
//   }
// };

// export const createDonation = async (input: CreateDonationInput) => {
//   try {
//     // Validate that donor exists
//     const donor = await prisma.donor.findUnique({
//       where: { id: input.donorId },
//     });
//     if (!donor) {
//       throw new Error('Donor not found');
//     }

//     // Validate that blood exists
//     const blood = await prisma.blood.findUnique({
//       where: { id: input.bloodId },
//     });
//     if (!blood) {
//       throw new Error('Blood record not found');
//     }

//     // Create the donation with related data
//     const donation = await prisma.donation.create({
//       data: {
//         donorId: input.donorId,
//         bloodId: input.bloodId,
//         donationDate: input.donationDate,
//       },
//       include: {
//         donor: true,
//         blood: true,
//       },
//     });

//     return {
//       donation,
//       message: 'Donation created successfully'
//     };
//   } catch (error) {
//     console.error('Error creating donation:', error);
//     if (error.message === 'Donor not found' || error.message === 'Blood record not found') {
//       throw error;
//     }
//     if (error.code === 'P2002') {
//       throw new Error('Duplicate donation record');
//     }
//     throw new Error('Failed to create donation');
//   }
// };

// export const updateDonation = async (
//   donationId: number,
//   updates: { donorId?: number; bloodId?: number; donationDate?: Date }
// ) => {
//   // First, find the donation by ID
//   const donation = await prisma.donation.findUnique({
//     where: { id: donationId },
//   });

//   // If the donation does not exist, return null or handle accordingly
//   if (!donation) {
//     return null;
//   }

//   // Update the donation with the provided fields
//   return await prisma.donation.update({
//     where: { id: donationId },
//     data: {
//       donorId: updates.donorId !== undefined ? updates.donorId : donation.donorId, // Preserve existing if not provided
//       bloodId: updates.bloodId !== undefined ? updates.bloodId : donation.bloodId, // Preserve existing if not provided
//       donationDate: updates.donationDate !== undefined ? updates.donationDate : donation.donationDate, // Preserve existing if not provided
//     },
//   });
// };

// export const deleteDonation = async (id: number) => {
//   try {
//     const donation = await prisma.donation.delete({
//       where: { id },
//     });
//     return donation;
//   } catch (error) {
//     if (error.code === 'P2025') {
//       return null; // Record not found
//     }
//     throw error; // Re-throw other database errors
//   }
// };
