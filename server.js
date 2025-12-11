const express = require("express");
const cors = require("cors");
const app = express();

// ★ CORS FIX – allow your Vercel frontend
app.use(
  cors({
    origin: [
      "https://frontend-ten-kappa-99.vercel.app",
      "http://localhost:5500"
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// ★ Allow headers manually also (Render sometimes blocks preflight)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://frontend-ten-kappa-99.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

// ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running with CORS FIXED!");
});

// SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port", PORT));
