const db = require("../db");

// GET ALL TABLES
exports.getTables = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM snooker_tables ORDER BY id"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET TABLES ERROR:", err);
    res.status(500).json({ error: "Database error" });
  }
};
