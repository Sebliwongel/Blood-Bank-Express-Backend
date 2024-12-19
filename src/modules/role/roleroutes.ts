import { Router } from "express";
import { dashboard } from "../role/rolecontroller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { checkRole } from "../../middlewares/roleMiddleware";

const router = Router();

router.get("/admin-dashboard", authMiddleware, checkRole("systemAdmin"), dashboard);
router.get("/donor-dashboard", authMiddleware, checkRole("donor"), dashboard);
router.get("/collector-dashboard", authMiddleware, checkRole("collector"), dashboard);
router.get("/lab-technician-dashboard", authMiddleware, checkRole("labTechnician"), dashboard);
router.get("/store-manager-dashboard", authMiddleware, checkRole("storeManager"), dashboard);
router.get("/manager-dashboard", authMiddleware, checkRole("manager"), dashboard);
router.get("/hospital-representative-dashboard", authMiddleware, checkRole("hospitalRepresentative"), dashboard);

export default router;
