const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
  origin: [
    "https://frontend-ten-kappa-99.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend running OK");
});

// DB TEST
app.get("/baby-test-db", async (req, res) => {
  try {
    const db = require("./db");
    await db.query("SELECT 1");
    res.json({ ok: true, message: "DB connected successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// AUTH ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
app.use("/api/tables", require("./routes/tables"));
app.use("/api/shifts", require("./routes/shift"));

// START SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
