import express from "express";
import { getTableHistory, getDayHistory, getRangeHistory } from "../controllers/historyController.js";
const router = express.Router();

router.get("/table", getTableHistory);   // ?table_id=1&branch=Rasson1
//router.get("/day", getDayHistory);       // ?branch=Rasson1&date=2025-12-10
//router.get("/range", getRangeHistory);   // ?branch=Rasson1&from=2025-12-01&to=2025-12-10

export default router;
