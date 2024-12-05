import { Router } from "express";
import {
  createAccountController,
  deleteAccountController,
  getAllAccountsController,
  getAccountByIdController,
  updateAccountController,
  activateAccountController,
  deactivateAccountController,
} from "./AccountController";

const router = Router();

// Routes for managing Accounts
router.get("/accounts", getAllAccountsController); // Get all accounts
router.get("/accounts/:id", getAccountByIdController); // Get a specific account by ID
router.post("/accounts", createAccountController); // Create a new account
router.patch("/accounts/:id", updateAccountController); // Update an account by ID
router.delete("/accounts/:id", deleteAccountController); // Delete an account by ID

// Routes for activating and deactivating accounts
router.patch("/accounts/:id/activate", activateAccountController); // Activate an account
router.patch("/accounts/:id/deactivate", deactivateAccountController); // Deactivate an account

export default router;
