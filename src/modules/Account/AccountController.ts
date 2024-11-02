import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewAccountSchema, UpdateAccountSchema } from "./AccountSchema";
import { Request, Response } from "express";
import {
  createAccount,
  deleteAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
} from "./AccountService";

// Create a new account
export const createAccountController = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(NewAccountSchema, req);
    const newAccount = await createAccount(
      parsed.userId,
      parsed.accountType,
      parsed.accountStatus
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
  try {
    const deleted = await deleteAccount(parseInt(accountId));
    if (!deleted) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete account" });
  }
};
