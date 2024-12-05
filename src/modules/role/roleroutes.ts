import { Router } from "express";
import { checkRole } from "../../middlewares/roleMiddleware";

const router = Router();

// Routes for different roles
router.get("/admin-dashboard", checkRole("system_admin"), (req, res) => {
  res.send("Welcome to the Admin Dashboard!");
});

router.get("/donor-dashboard", checkRole("donor"), (req, res) => {
  res.send("Welcome to the Donor Dashboard!");
});

router.get("/lab-dashboard", checkRole("lab_technician"), (req, res) => {
  res.send("Welcome to the Lab Technician Dashboard!");
});

export default router;
