const express = require("express");

const app = express(); // 🔥 THIS LINE WAS THE ISSUE IF MISSING

/* =======================
   CORS – FINAL FIX
======================= */
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://frontend-ten-kappa-99.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/* BODY PARSER */
app.use(express.json());

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Backend running OK with CORS");
});

/* AUTH ROUTES */
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

/* SERVER START */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
