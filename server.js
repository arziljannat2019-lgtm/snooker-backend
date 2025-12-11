const express = require("express");
const cors = require("cors");
const app = express();

// -------------------- CORS FIX --------------------
app.use(
  cors({
    origin: "https://frontend-ten-kappa-99.vercel.app",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

app.options("*", cors()); // Preflight fix
// --------------------------------------------------

app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running with CORS 🔥✨");
});

// IMPORT ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// START SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
