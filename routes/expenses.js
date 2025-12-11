import express from "express";
import { addExpense, getExpenses } from "../controllers/expensesController.js";
const router = express.Router();

router.post("/add", addExpense);
router.get("/list", getExpenses); // ?branch=Rasson1&date=2025-12-10

export default router;
