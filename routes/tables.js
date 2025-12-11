import express from "express";
import { checkInTable, checkOutTable } from "../controllers/tablesController.js";

const router = express.Router();

router.post("/checkin", checkInTable);
router.post("/checkout", checkOutTable);

export default router;
