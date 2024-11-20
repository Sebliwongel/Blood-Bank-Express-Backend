import { Router } from "express";
import { register } from "./userController";

const router = Router();

router.post("user/register", register);

export default router;
