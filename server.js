const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// ✅ middleware FIRST
app.use(express.json());
app.use(bodyParser.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend running OK");
});

// db test
app.get("/baby-test-db", async (req, res) => {
  try {
    const db = require("./db");
    await db.query("SELECT 1");
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
});

// auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
