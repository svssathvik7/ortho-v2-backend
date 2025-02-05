import express from "express";
import { searchPatients } from "../controllers/searchController.js";

const router = express.Router();

// Search patients route
router.get("/patients/search", searchPatients);

export default router;
