import { Router } from "express";
import { createDonorController } from "./donorController";

const router = Router();

router.get("/donor");
router.get("/donor/:id");
router.post("/donor", createDonorController);
router.patch("/donor");
router.delete("/donor");

export default router;
