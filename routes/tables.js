const express = require("express");
const { checkInTable, checkOutTable } = require("../controllers/tablesController");

const router = express.Router();

router.post("/checkin", checkInTable);
router.post("/checkout", checkOutTable);

module.exports = router;
