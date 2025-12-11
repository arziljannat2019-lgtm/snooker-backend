const express = require("express");
const { closeShift } = require("../controllers/shiftsController");

const router = express.Router();

router.post("/close", closeShift);

module.exports = router;
