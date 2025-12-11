const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

// FULL CORS FIX
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // <-- MOST IMPORTANT
  }

  next();
});

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
