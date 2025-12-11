const express = require("express");
const cors = require("cors");
const app = express();

// --- FULL CORS FIX ---
app.use(
  cors({
    origin: "*", // Allow all origins (Vercel frontend)
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());

// Manual headers (extra protection)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // MOST IMPORTANT → Preflight response
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
