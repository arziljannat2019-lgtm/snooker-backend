import express from "express";
import { getDailyReport, getMonthlyReport, getSummaryReport } from "../controllers/reportsController.js";
const router = express.Router();

router.get("/daily", getDailyReport);     // ?branch=Rasson1&date=2025-12-10
router.get("/monthly", getMonthlyReport); // ?branch=Rasson1&month=2025-12
router.get("/summary", getSummaryReport); // ?branch=Rasson1

export default router;
