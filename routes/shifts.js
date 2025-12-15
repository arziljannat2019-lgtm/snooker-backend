const express = require("express");
const router = express.Router();

const {
  closeShift
} = require("../controllers/shiftController");

// SHIFT CLOSE
router.post("/close", closeShift);

module.exports = router;
