import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllDonors = async () => {
  return await prisma.donor.findMany();
};

// export const getDonorByEmail = async (email: string) => {
//   return await prisma.donor.findUnique({
//     where: { email: email },
//   });
// };

export const getDonorById = async (id: number) => {
  return await prisma.donor.findUnique({
    where: { id },
  });
};

export const createDonor = async (userId: number, bloodType: string) => {
  return await prisma.donor.create({
    data: {
      userId,
      bloodType,
    },
  });
};

export const deleteDonor = async (id: number) => {
  return await prisma.donor.delete({
    where: { id },
  });
};
