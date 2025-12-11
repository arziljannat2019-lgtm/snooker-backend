const mysql = require("mysql2");

// FINAL FIXED PUBLIC DATABASE CONNECTION (Render + Railway Compatible)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ MySQL Connected Successfully!");
    }
});

module.exports = db;
