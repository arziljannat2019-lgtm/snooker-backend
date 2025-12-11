const express = require("express");
const { getTableHistory, getDayHistory, getRangeHistory } = require("../controllers/historyController");

const router = express.Router();

router.get("/table", getTableHistory);
//router.get("/day", getDayHistory);
//router.get("/range", getRangeHistory);

module.exports = router;
