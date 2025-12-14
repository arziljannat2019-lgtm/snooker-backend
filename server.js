const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 CORS FIX (VERY IMPORTANT)
app.use(cors({
  origin: [
    "https://frontend-ten-kappa-99.vercel.app"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// allow preflight
app.options("*", cors());

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend running OK");
});

// routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
