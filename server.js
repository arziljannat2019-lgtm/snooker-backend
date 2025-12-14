const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.json());

// 🔹 ROOT ROUTE (TEST)
app.get("/", (req, res) => {
  res.send("Backend running OK");
});

// 🔹 DB TEST ROUTE (BABY STEP)
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


console.log("ROUTES LOADED:");
app._router.stack.forEach(r => {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});


// server start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
