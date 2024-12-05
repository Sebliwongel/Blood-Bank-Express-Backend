// src/controllers/roleController.ts
import { Request, Response } from "express";

export const adminDashboard = (req: Request, res: Response) => {
  res.send("Welcome to the Admin Dashboard!");
};

export const donorDashboard = (req: Request, res: Response) => {
  res.send("Welcome to the Donor Dashboard!");
};

export const labTechnicianDashboard = (req: Request, res: Response) => {
  res.send("Welcome to the Lab Technician Dashboard!");
};
