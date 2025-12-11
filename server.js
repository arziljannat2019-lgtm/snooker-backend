const express = require("express");
const cors = require("cors");

const tablesRoutes = require("./routes/tables");
const syncRoutes = require("./routes/sync");
const authRoutes = require("./routes/auth");
const historyRoutes = require("./routes/history");
const reportRoutes = require("./routes/reports");
const shiftRoutes = require("./routes/shifts");
const expenseRoutes = require("./routes/expenses");
const dayRoutes = require("./routes/dayRoutes");

require("./db");

const app = express();

/* ------------------ FINAL CORS FIX FOR VERCEL ------------------ */
app.use(cors({
  origin: "https://frontend-ten-kappa-99.vercel.app",  // your Vercel frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));

// Preflight (OPTIONS) MUST be handled
app.options("/api/*", cors({
  origin: "https://frontend-ten-kappa-99.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* --------------------------------------------------------------- */

app.use(express.json());

// API routes
app.use("/api/tables", tablesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/day", dayRoutes);
app.use("/api/sync", syncRoutes);

// Render required port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
