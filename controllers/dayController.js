const db = require("../db");

exports.closeDay = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ success: false });
    }

    await db.query(
      "INSERT INTO day_snapshots (day_date) VALUES (?)",
      [date]
    );

    res.json({ success: true, message: "Day closed successfully" });
  } catch (err) {
    console.error("DAY CLOSE ERROR:", err);
    res.status(500).json({ success: false });
  }
};
