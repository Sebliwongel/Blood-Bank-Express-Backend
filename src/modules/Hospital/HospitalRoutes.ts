import { Router } from "express";
import {
  getAllHospitalsController,
  createHospitalController,
  getHospitalByIdController,
  updateHospitalController,
  patchHospitalController,
  deleteHospitalController,
} from "./HospitalController";
import { validateSchema } from "../../middlewares/validateSchema";
import {
  CreateHospitalSchema,
  UpdateHospitalSchema,
  HospitalIdSchema,
} from "./HospitalSchema";

const router = Router();

// Get all hospitals
router.get("/hospitals", getAllHospitalsController);

// Get a hospital by ID with schema validation
router.get(
  "/hospitals/:id",
  validateSchema({ params: HospitalIdSchema }),
  getHospitalByIdController
);

// Create a new hospital with schema validation
router.post(
  "/hospitals",
  validateSchema({ body: CreateHospitalSchema }),
  createHospitalController
);

// Update a hospital by ID with schema validation
router.put(
  "/hospitals/:id",
  validateSchema({ params: HospitalIdSchema, body: UpdateHospitalSchema }),
  updateHospitalController
);

// Patch a hospital by ID with schema validation
router.patch(
  "/hospitals/:id",
  validateSchema({ params: HospitalIdSchema, body: UpdateHospitalSchema.partial() }),
  patchHospitalController
);

// Delete a hospital by ID with schema validation
router.delete(
  "/hospitals/:id",
  validateSchema({ params: HospitalIdSchema }),
  deleteHospitalController
);

export default router;
