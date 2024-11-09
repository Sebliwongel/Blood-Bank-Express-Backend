import { Router } from "express";
import {
  createReportController,
  getAllReportsController,
  getReportByIdController,
  updateReportController,
  deleteReportController,
} from "./ReportController";

// Create a new router instance
const router = Router();

// Define the routes for reports

// POST /api/report - Create a new report
router.post("/api/report", createReportController);

// GET /api/report - Get all reports
router.get("/api/report", getAllReportsController);

// GET /api/report/:id - Get a report by ID
router.get("/api/report/:id", getReportByIdController);

// PATCH /api/report/:id - Update a report
router.patch("/api/report/:id", updateReportController);

// DELETE /api/report/:id - Delete a report
router.delete("/api/report/:id", deleteReportController);

export default router;
