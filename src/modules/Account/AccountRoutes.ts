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
import { isAdmin } from "./../../middlewares/authMiddleware";

const router = Router();

// Routes for managing Accounts
router.get("/accounts", getAllAccountsController); // Get all accounts
router.get("/accounts/:id", getAccountByIdController); // Get a specific account by ID
router.post("/accounts", createAccountController); // Create a new account
router.patch("/accounts/:id", updateAccountController); // Update an account by ID
router.delete("/accounts/:id", isAdmin, deleteAccountController); // Delete an account by ID (Admin only)

// Routes for activating and deactivating accounts
router.patch("/accounts/:id/activate", isAdmin, activateAccountController); // Activate an account
router.patch("/accounts/:id/deactivate", isAdmin, deactivateAccountController); // Deactivate an account

export default router;
