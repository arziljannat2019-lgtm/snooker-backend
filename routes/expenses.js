const express = require("express");
const { addExpense, getExpenses } = require("../controllers/expensesController");

const router = express.Router();

router.post("/add", addExpense);
router.get("/list", getExpenses);

module.exports = router;
