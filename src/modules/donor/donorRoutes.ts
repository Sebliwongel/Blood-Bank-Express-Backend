import { Router } from "express";
import {
  createDonorController,
  deleteDonorController,
  getAllDonorController,
  getDonorByIdController,
  updateDonorController,
} from "./donorController";

const router = Router();

router.get("/api/donor", getAllDonorController);
router.get("/api/donor/:id", getDonorByIdController);
router.post("/api/donor", createDonorController);
router.patch("/api/donor/:id", updateDonorController); // Updated to include the ID
router.delete("/api/donor/:id", deleteDonorController); // Updated to include the ID

export default router;
