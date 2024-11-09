import { Request, Response } from "express";
import {
  createIntegration,
  deleteIntegration,
  getAllIntegrations,
  getIntegrationById,
  updateIntegration,
} from "./IntegrationService";
import { validateAndParse } from "../../utils/validateAndParseRequest";
import { NewIntegrationSchema, UpdateIntegrationSchema } from "./IntegrationSchema";

// Controller to create a new integration
export const createIntegrationController = async (req: Request, res: Response) => {
  try {
    const parsed = await validateAndParse(NewIntegrationSchema, req);
    const newIntegration = await createIntegration(parsed.hospitalId);
    res.status(201).json(newIntegration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create integration" });
  }
};

// Controller to get all integrations
export const getAllIntegrationsController = async (req: Request, res: Response) => {
  try {
    const integrations = await getAllIntegrations();
    res.status(200).json(integrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve integrations" });
  }
};

// Controller to get an integration by ID
export const getIntegrationByIdController = async (req: Request, res: Response) => {
  const integrationId = req.params.id;
  try {
    const integration = await getIntegrationById(parseInt(integrationId));
    if (!integration) {
      return res.status(404).json({ error: "Integration not found" });
    }
    res.status(200).json(integration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve integration" });
  }
};

// Controller to update an integration
export const updateIntegrationController = async (req: Request, res: Response) => {
  const integrationId = req.params.id;
  try {
    const parsed = await validateAndParse(UpdateIntegrationSchema, req);
    const updatedIntegration = await updateIntegration(parseInt(integrationId), parsed);
    if (!updatedIntegration) {
      return res.status(404).json({ error: "Integration not found" });
    }
    res.status(200).json(updatedIntegration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update integration" });
  }
};

// Controller to delete an integration
export const deleteIntegrationController = async (req: Request, res: Response) => {
  const integrationId = req.params.id;
  try {
    const deleted = await deleteIntegration(parseInt(integrationId));
    if (!deleted) {
      return res.status(404).json({ error: "Integration not found" });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete integration" });
  }
};
