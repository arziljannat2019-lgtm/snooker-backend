const express = require("express");
const router = express.Router();
const {
  getTables,
  startTable,
  stopTable
} = require("../controllers/tablesController");

router.get("/", getTables);
router.post("/start", startTable);
router.post("/stop", stopTable);

module.exports = router;
