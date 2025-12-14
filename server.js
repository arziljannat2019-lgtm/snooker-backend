const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// ✅ CORS FIX (Vercel + Local allowed)
app.use(cors({
  origin: [
    "https://frontend-ten-kappa-99.vercel.app",
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// middleware
app.use(express.json());
app.use(bodyParser.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend running OK");
});

// auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
