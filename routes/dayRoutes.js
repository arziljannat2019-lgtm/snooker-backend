const express = require("express");
const router = express.Router();
const { closeDay } = require("../controllers/dayController");

router.post("/close", closeDay);

module.exports = router;
