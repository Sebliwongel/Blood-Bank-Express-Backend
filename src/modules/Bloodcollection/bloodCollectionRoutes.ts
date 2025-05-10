import express from "express";
import { handleBloodCollection } from "../Bloodcollection/bloodCollectionController";

const router = express.Router();

// POST route for submitting blood collection data
router.post("/blood-collection", handleBloodCollection);

export default router;


