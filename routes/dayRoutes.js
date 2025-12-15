const express = require("express");
const router = express.Router();
const day = require("../controllers/dayController");

router.post("/close", day.closeDay);

module.exports = router;
