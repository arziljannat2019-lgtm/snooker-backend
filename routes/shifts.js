const express = require("express");
const router = express.Router();
const shift = require("../controllers/shiftController");

router.post("/close", shift.closeShift);

module.exports = router;
