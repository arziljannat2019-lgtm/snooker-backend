const express = require("express");
const app = express();

/* 🔥🔥🔥 HARD CORS FIX 🔥🔥🔥 */
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://frontend-ten-kappa-99.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
/* 🔥🔥🔥 END CORS 🔥🔥🔥 */

app.use(express.json());

// test
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
