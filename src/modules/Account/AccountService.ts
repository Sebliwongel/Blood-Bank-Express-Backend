import { PrismaClient } from "@prisma/client";
import { UserRole } from "./../../models/enum"; // Ensure to import UserRole if it's in another file

const prisma = new PrismaClient();

// Get all Accounts
export const getAllAccounts = async () => {
  return await prisma.account.findMany();
};

// Get an Account by ID
export const getAccountById = async (id: number) => {
  return await prisma.account.findUnique({
    where: { id },
  });
};

// Create a new Account (for Donor, Hospital, or other Users)
export const createAccount = async (
  userId: number,
  accountType: string,
  accountStatus: string,
  hospitalId?: number, // Optional for hospital accounts
  donorId?: number // Optional for donor accounts
) => {
  const newAccount = await prisma.account.create({
    data: {
      userId,
      accountType,
      accountStatus,
      hospitalId,
      donorId,
    },
  });
  return newAccount;
};

// Update an Account
export const updateAccount = async (
  accountId: number,
  updates: { userId?: number; accountType?: string; accountStatus?: string }
) => {
  // Find the account by ID
  const account = await prisma.account.findUnique({
    where: { id: accountId },
  });

  if (!account) {
    return null;
  }

  // Update the account with provided fields
  return await prisma.account.update({
    where: { id: accountId },
    data: {
      userId: updates.userId !== undefined ? updates.userId : account.userId,
      accountType:
        updates.accountType !== undefined ? updates.accountType : account.accountType,
      accountStatus:
        updates.accountStatus !== undefined ? updates.accountStatus : account.accountStatus,
    },
  });
};

// Deactivate an Account (System Admin role only)
export const deactivateAccount = async (accountId: number, adminId: number) => {
  // Check if the user is a system admin
  const adminUser = await prisma.user.findUnique({
    where: { id: adminId },
  });

  if (adminUser?.role !== UserRole.SYSTEM_ADMIN) {
    throw new Error("Only System Admin can deactivate accounts.");
  }

  // Find the account by ID
  const account = await prisma.account.findUnique({
    where: { id: accountId },
  });

  if (!account) {
    return null;
  }

  // Deactivate the account
  return await prisma.account.update({
    where: { id: accountId },
    data: {
      isActive: false,
      deactivationDate: new Date(),
    },
  });
};

// Activate an Account (System Admin role only)
export const activateAccount = async (accountId: number, adminId: number) => {
  // Check if the user is a system admin
  const adminUser = await prisma.user.findUnique({
    where: { id: adminId },
  });

  if (adminUser?.role !== UserRole.SYSTEM_ADMIN) {
    throw new Error("Only System Admin can activate accounts.");
  }

  // Find the account by ID
  const account = await prisma.account.findUnique({
    where: { id: accountId },
  });

  if (!account) {
    return null;
  }

  // Activate the account
  return await prisma.account.update({
    where: { id: accountId },
    data: {
      isActive: true,
      activationDate: new Date(),
    },
  });
};

// Delete an Account
export const deleteAccount = async (accountId: number, adminId: number) => {
  // Ensure only system admins can delete accounts
  const adminUser = await prisma.user.findUnique({
    where: { id: adminId },
  });

  if (adminUser?.role !== UserRole.SYSTEM_ADMIN) {
    throw new Error("Only System Admin can delete accounts.");
  }

  return await prisma.account.delete({
    where: { id: accountId },
  });
};
