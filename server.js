const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");   // ✅ ADD THIS
const db = require("./db");

const app = express();

// ✅ MIDDLEWARE (ORDER VERY IMPORTANT)
app.use(cors());                // ✅ ADD THIS
app.use(express.json());
app.use(bodyParser.json());

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend running OK");
});

// DB TEST
app.get("/baby-test-db", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ ok: true, message: "DB connected successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// AUTH ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// server start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
