const express = require("express");
const { saveDayClose } = require("../controllers/dayController");

const router = express.Router();

router.post("/close", saveDayClose);

module.exports = router;
