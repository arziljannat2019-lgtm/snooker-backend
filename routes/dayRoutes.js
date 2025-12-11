import express from "express";
import { saveDayClose } from "../controllers/dayController.js";

const router = express.Router();

router.post("/close", saveDayClose);

export default router;
