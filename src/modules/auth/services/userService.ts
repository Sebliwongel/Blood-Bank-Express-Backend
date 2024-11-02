import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email: email },
  });
};

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      id: 0,
      email: email,
      password: hashedPassword,
      role: UserRole.MANAGER,
      name: "Sebli",
    },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
