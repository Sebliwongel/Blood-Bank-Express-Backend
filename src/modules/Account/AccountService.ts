import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all Accounts
export const getAllAccounts = async () => {
  return await prisma.account.findMany();
};

// Update an Account
export const updateAccount = async (
  accountId: number,
  updates: { userId?: number; accountType?: string; accountStatus?: string }
) => {
  // First, find the account by ID
  const account = await prisma.account.findUnique({
    where: { id: accountId },
  });

  // If the account does not exist, return null or handle accordingly
  if (!account) {
    return null;
  }

  // Update the account with the provided fields
  return await prisma.account.update({
    where: { id: accountId },
    data: {
      userId: updates.userId !== undefined ? updates.userId : account.userId, // Preserve existing if not provided
      accountType:
        updates.accountType !== undefined
          ? updates.accountType
          : account.accountType, // Preserve existing if not provided
      accountStatus:
        updates.accountStatus !== undefined
          ? updates.accountStatus
          : account.accountStatus, // Preserve existing if not provided
    },
  });
};

// Get an Account by ID
export const getAccountById = async (id: number) => {
  return await prisma.account.findUnique({
    where: { id },
  });
};

// Create a new Account
export const createAccount = async (
  userId: number,
  accountType: string,
  accountStatus: string
) => {
  return await prisma.account.create({
    data: {
      userId,
      accountType,
      accountStatus,
    },
  });
};

// Delete an Account
export const deleteAccount = async (id: number) => {
  return await prisma.account.delete({
    where: { id },
  });
};
