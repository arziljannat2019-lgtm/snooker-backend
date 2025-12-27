const express = require("express");
const router = express.Router();

const {
  startTable,
  stopTable
} = require("../controllers/tablesController");

router.post("/start", startTable);
router.post("/stop", stopTable);

module.exports = router;
