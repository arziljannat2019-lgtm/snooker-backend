const express = require("express");
const router = express.Router();
const tablesController = require("../controllers/tablesController");

// table start
router.post("/start", tablesController.startTable);

// table stop
router.post("/stop", tablesController.stopTable);

module.exports = router;
