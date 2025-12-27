const express = require("express");
const router = express.Router();
const dayController = require("../controllers/dayController");

router.post("/close", dayController.closeDay);

module.exports = router;
