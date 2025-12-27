const express = require("express");
const router = express.Router();

const {
  startTable
} = require("../controllers/tablesController");

router.post("/start", startTable);

module.exports = router;
