const express = require("express");
const { syncOfflineSessions } = require("../controllers/syncController");

const router = express.Router();

router.post("/sessions", syncOfflineSessions);

module.exports = router;
