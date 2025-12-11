const express = require("express");
const { getDailyReport, getMonthlyReport, getSummaryReport } = require("../controllers/reportsController");

const router = express.Router();

router.get("/daily", getDailyReport);
router.get("/monthly", getMonthlyReport);
router.get("/summary", getSummaryReport);

module.exports = router;
