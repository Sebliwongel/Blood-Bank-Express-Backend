import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewAccountSchema, UpdateAccountSchema } from "./AccountSchema";
import { Request, Response } from "express";
import {
  createAccount,
  deleteAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  activateAccount,
  deactivateAccount,
} from "./AccountService";

// Create a new account
export const createAccountController = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(NewAccountSchema, req);
    const newAccount = await createAccount(
      parsed.userId,
      parsed.accountType,
      parsed.accountStatus,
      parsed.hospitalId,
      parsed.donorId
    );
    res.status(201).json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create account" });
  }
};

// Get all accounts
export const getAllAccountsController = async (req: Request, res: Response) => {
  try {
    const accounts = await getAllAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve accounts" });
  }
};

// Get an account by ID
export const getAccountByIdController = async (req: Request, res: Response) => {
  const accountId = req.params.id; // Assuming the ID is passed as a route parameter
  try {
    const account = await getAccountById(parseInt(accountId));
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve account" });
  }
};

// Update an account
export const updateAccountController = async (req: Request, res: Response) => {
  const accountId = req.params.id;
  try {
    const parsed = await validateAndParse(UpdateAccountSchema, req);
    const updatedAccount = await updateAccount(parseInt(accountId), parsed);
    if (!updatedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json(updatedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update account" });
  }
};

// Delete an account
export const deleteAccountController = async (req: Request, res: Response) => {
  const accountId = req.params.id;
  const adminId = req.body.adminId; // The admin ID should be passed in the request body or via an auth system
  try {
    const deleted = await deleteAccount(parseInt(accountId), adminId);
    if (!deleted) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete account" });
  }
};

// Activate an account
export const activateAccountController = async (req: Request, res: Response) => {
  const accountId = req.params.id;
  const adminId = req.body.adminId; // Admin ID should be passed in the request body
  try {
    const activatedAccount = await activateAccount(parseInt(accountId), adminId);
    if (!activatedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json(activatedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to activate account" });
  }
};

// Deactivate an account
export const deactivateAccountController = async (req: Request, res: Response) => {
  const accountId = req.params.id;
  const adminId = req.body.adminId; // Admin ID should be passed in the request body
  try {
    const deactivatedAccount = await deactivateAccount(parseInt(accountId), adminId);
    if (!deactivatedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json(deactivatedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to deactivate account" });
  }
};
