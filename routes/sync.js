import express from "express";
import { syncOfflineSessions } from "../controllers/syncController.js";

const router = express.Router();

router.post("/sessions", syncOfflineSessions);

export default router;
