const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// --------------- FIXED CORS (FINAL) -----------------
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
// ----------------------------------------------------

app.use(express.json());
app.use(bodyParser.json());

// ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running with FULL CORS FIX!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
