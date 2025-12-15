const express = require("express");
const router = express.Router();

const {
  startTable,
  stopTable
} = require("../controllers/tablesController");

// START TABLE
router.post("/start", startTable);

// STOP TABLE
router.post("/stop", stopTable);

module.exports = router;
