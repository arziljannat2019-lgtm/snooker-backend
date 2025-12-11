import express from "express";
import cors from "cors";
import tablesRoutes from "./routes/tables.js";
import syncRoutes from "./routes/sync.js";
import authRoutes from "./routes/auth.js";
import historyRoutes from "./routes/history.js";
import reportRoutes from "./routes/reports.js";
import shiftRoutes from "./routes/shifts.js";
import expenseRoutes from "./routes/expenses.js";
import dayRoutes from "./routes/dayRoutes.js";
import "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tables", tablesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/day", dayRoutes);
app.use("/api/sync", syncRoutes);

app.listen(5000, () => console.log("Backend running on port 5000"));
