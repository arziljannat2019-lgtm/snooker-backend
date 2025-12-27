const db = require("../db");


/**
 * DAY CLOSE
 * Frontend sends: date
 */
exports.closeDay = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ success: false });
    }

    // Aggregate table sessions
    const [tables] = await db.query(
      `SELECT 
         COUNT(DISTINCT table_id) AS total_sessions,
         SUM(TIMESTAMPDIFF(MINUTE, start_time, end_time)) AS total_minutes,
         SUM(total_amount) AS total_amount
       FROM table_sessions
       WHERE DATE(start_time) = ?`,
      [date]
    );

    const total_sessions = tables[0].total_sessions || 0;
    const total_minutes = tables[0].total_minutes || 0;
    const total_amount = tables[0].total_amount || 0;

    await db.query(
      `INSERT INTO day_snapshots
       (day_date, total_sessions, total_minutes, total_amount, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [date, total_sessions, total_minutes, total_amount]
    );

    res.json({ success: true, message: "Day closed successfully" });
  } catch (err) {
    console.error("DAY CLOSE ERROR:", err);
    res.status(500).json({ success: false });
  }
};
