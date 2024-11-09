import express from "express";
import {
  createIntegrationController,
  deleteIntegrationController,
  getAllIntegrationsController,
  getIntegrationByIdController,
  updateIntegrationController,
} from "./IntegrationController";

const router = express.Router();

// Route to create a new integration
router.post("/api/integration", createIntegrationController);

// Route to get all integrations
router.get("/api/integration", getAllIntegrationsController);

// Route to get a single integration by ID
router.get("/api/integration/:id", getIntegrationByIdController);

// Route to update an integration by ID
router.patch("/api/integration/:id", updateIntegrationController);

// Route to delete an integration by ID
router.delete("/api/integration/:id", deleteIntegrationController);

export default router;
