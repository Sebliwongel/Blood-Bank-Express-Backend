import { PrismaClient } from "@prisma/client";
import { User, NewUser } from "./userSchema";  // Import Zod schemas for validation
import * as bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to safely extract the error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

// Helper function to map input data for creating a new user
const mapToUserCreateInput = (data: NewUser): Prisma.UserCreateInput => {
  return {
    ...data,
    password: data.password, // Handle password hashing in the service logic
  };
};

// Service for creating a new user
export const createUser = async (userData: NewUser) => {
  try {
    const userCreateInput = mapToUserCreateInput(userData);

    console.log(userCreateInput);
    

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userCreateInput.password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...userCreateInput,
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (error) {
    throw new Error(`Failed to create user}`);
  }
};

// Service for fetching all users
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${getErrorMessage(error)}`);
  }
};

// Service for getting a user by ID
export const getUserById = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error(`User with ID ${id} not found`);
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user by ID: ${getErrorMessage(error)}`);
  }
};

// Service for getting a user by username
// export const getUserByUsername = async (username: string) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { username },
//     });
//     if (!user) throw new Error(`User with username ${username} not found`);
//     return user;
//   } catch (error) {
//     throw new Error(`Failed to fetch user by username: ${getErrorMessage(error)}`);
//   }
// };

// Service for updating a user
export const updateUser = async (id: number, updatedData: Partial<User>) => {
  try {
    const userUpdateInput: Prisma.UserUpdateInput = {
      ...updatedData,
    };

    // Update the user using Prisma
    const updatedUser = await prisma.user.update({
      where: { id },
      data: userUpdateInput,
    });

    return updatedUser;
  } catch (error) {
    throw new Error(`Failed to update user: ${getErrorMessage(error)}`);
  }
};

// Service for deleting a user
export const deleteUser = async (id: number) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  } catch (error) {
    throw new Error(`Failed to delete user: ${getErrorMessage(error)}`);
  }
};

// Service for patching (partial update) a user
export const patchUser = async (id: number, patchData: Partial<User>) => {
  try {
    const userUpdateInput: Prisma.UserUpdateInput = {
      ...patchData,
    };

    const patchedUser = await prisma.user.update({
      where: { id },
      data: userUpdateInput,
    });

    return patchedUser;
  } catch (error) {
    throw new Error(`Failed to patch user: ${getErrorMessage(error)}`);
  }
};

// Service for getting a user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error(`User with email ${email} not found`);
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user by email: ${getErrorMessage(error)}`);
  }
};

// Service for verifying a user's password
export const verifyPassword = async (inputPassword: string, storedPassword: string) => {
  try {
    const isMatch = await bcrypt.compare(inputPassword, storedPassword);
    if (!isMatch) throw new Error("Invalid credentials");
    return true;
  } catch (error) {
    throw new Error(`Failed to verify password: ${getErrorMessage(error)}`);
  }
};
