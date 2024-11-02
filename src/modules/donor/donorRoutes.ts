import { Router } from "express";
import {
  createDonorController,
  deleteDonorController,
  getAllDonorController,
  getDonorByIdController,
  updateDonorController,
} from "./donorController";

const router = Router();

router.get("/donor", getAllDonorController);
router.get("/donor/:id", getDonorByIdController);
router.post("/donor", createDonorController);
router.patch("/donor/:id", updateDonorController); // Updated to include the ID
router.delete("/donor/:id", deleteDonorController); // Updated to include the ID

export default router;
