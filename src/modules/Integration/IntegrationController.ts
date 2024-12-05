import { Request, Response } from "express";
import {
  createIntegration,
  deleteIntegration,
  getAllIntegrations,
  getIntegrationById,
  updateIntegration,
  approveIntegration,
  declineIntegration,
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
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to create integration" });
    }
  }
};

// Controller to get all integrations
export const getAllIntegrationsController = async (req: Request, res: Response) => {
  try {
    const integrations = await getAllIntegrations();
    res.status(200).json(integrations);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to retrieve integrations" });
    }
  }
};

// Controller to get an integration by ID
export const getIntegrationByIdController = async (req: Request, res: Response) => {
  const integrationId = parseInt(req.params.id, 10); // Ensuring the ID is a number
  try {
    const integration = await getIntegrationById(integrationId);
    if (!integration) {
      return res.status(404).json({ error: "Integration not found" });
    }
    res.status(200).json(integration);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to retrieve integration" });
    }
  }
};

// Controller to update an integration
export const updateIntegrationController = async (req: Request, res: Response) => {
  const integrationId = parseInt(req.params.id, 10); // Ensuring the ID is a number
  try {
    const parsed = await validateAndParse(UpdateIntegrationSchema, req);
    const updatedIntegration = await updateIntegration(integrationId, parsed);
    if (!updatedIntegration) {
      return res.status(404).json({ error: "Integration not found" });
    }
    res.status(200).json(updatedIntegration);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to update integration" });
    }
  }
};

// Controller to delete an integration
export const deleteIntegrationController = async (req: Request, res: Response) => {
  const integrationId = parseInt(req.params.id, 10); // Ensuring the ID is a number
  try {
    const deleted = await deleteIntegration(integrationId);
    if (!deleted) {
      return res.status(404).json({ error: "Integration not found" });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to delete integration" });
    }
  }
};

// Controller to approve an integration request
export const approveIntegrationController = async (req: Request, res: Response) => {
  const integrationId = parseInt(req.params.id, 10); // Ensuring the ID is a number
  const { managerId, comment } = req.body;
  try {
    const approvedIntegration = await approveIntegration(integrationId, managerId, comment);
    res.status(200).json(approvedIntegration);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to approve integration" });
    }
  }
};

// Controller to decline an integration request
export const declineIntegrationController = async (req: Request, res: Response) => {
  const integrationId = parseInt(req.params.id, 10); // Ensuring the ID is a number
  const { managerId, comment } = req.body;
  try {
    const declinedIntegration = await declineIntegration(integrationId, managerId, comment);
    res.status(200).json(declinedIntegration);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to decline integration" });
    }
  }
};
