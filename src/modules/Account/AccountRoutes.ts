import { Router } from "express";
import {
  createAccountController,
  deleteAccountController,
  getAllAccountsController,
  getAccountByIdController,
  updateAccountController,
} from "./AccountController";

const router = Router();

// Routes for managing Accounts
router.get("/accounts", getAllAccountsController);
router.get("/accounts/:id", getAccountByIdController);
router.post("/accounts", createAccountController);
router.patch("/accounts/:id", updateAccountController); // Updated to include the ID
router.delete("/accounts/:id", deleteAccountController); // Updated to include the ID

export default router;
