// import { PrismaClient, UserRole } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// export const getAllUsers = async () => {
//   return await prisma.user.findMany();
// };

// export const getUserByEmail = async (email: string) => {
//   return await prisma.user.findUnique({
//     where: { email: email },
//   });
// };

// export const createUser = async (
//   name: string,
//   role: string,
//   email: string,
//   password: string
// ) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   return await prisma.user.create({
//     data: {
//       email: email,
//       password: hashedPassword,
//       role: role as UserRole,
//       name: name,
//     },
//   });
// };

// export const deleteUser = async (id: number) => {
//   return await prisma.user.delete({
//     where: { id },
//   });
// };
