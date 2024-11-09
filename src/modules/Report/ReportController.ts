import { Request, Response } from "express";
import {
  createReport,
  deleteReport,
  getAllReports,
  getReportById,
  updateReport,
} from "./ReportService";

// Create a new report
export const createReportController = async (req: Request, res: Response) => {
  const { title, content, generatedBy } = req.body;

  try {
    const newReport = await createReport(title, content, generatedBy);
    res.status(201).json(newReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create report" });
  }
};

// Get all reports
export const getAllReportsController = async (req: Request, res: Response) => {
  try {
    const reports = await getAllReports();
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve reports" });
  }
};

// Get a report by ID
export const getReportByIdController = async (req: Request, res: Response) => {
  const reportId = parseInt(req.params.id); // Convert string to number

  try {
    const report = await getReportById(reportId);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve report" });
  }
};

// Update a report
export const updateReportController = async (req: Request, res: Response) => {
  const reportId = parseInt(req.params.id); // Convert string to number
  const { title, content, generatedBy } = req.body;

  try {
    const updatedReport = await updateReport(reportId, { title, content, generatedBy });
    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(updatedReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update report" });
  }
};

// Delete a report
export const deleteReportController = async (req: Request, res: Response) => {
  const reportId = parseInt(req.params.id); // Convert string to number

  try {
    const deletedReport = await deleteReport(reportId);
    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete report" });
  }
};
