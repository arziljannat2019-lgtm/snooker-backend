const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// ✅ MIDDLEWARE (ORDER VERY IMPORTANT)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ THIS FIXES IT
app.use(bodyParser.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend running OK");
});

// AUTH ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
