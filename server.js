const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.json());

// 🔥 FINAL CORS FIX
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors());

// ROUTES FIX
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running with FULL CORS FIX!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
