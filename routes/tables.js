const express = require("express");
const router = express.Router();
const { getTables } = require("../controllers/tablesController");

// GET tables list
router.get("/", getTables);

module.exports = router;
