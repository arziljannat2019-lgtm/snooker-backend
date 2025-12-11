import express from "express";
import { closeShift } from "../controllers/shiftsController.js";
const router = express.Router();

router.post("/close", closeShift); // body contains shift summary from frontend

export default router;
