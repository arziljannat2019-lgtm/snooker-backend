const db = require("../db");

exports.closeDay = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "date required"
      });
    }

    // 1️⃣ Total shifts (shift_snapshots)
    const [shifts] = await db.query(
      `SELECT COUNT(*) AS total_shifts
       FROM shift_snapshots
       WHERE DATE(created_at) = ?`,
      [date]
    );

    // 2️⃣ Total sessions + minutes + amount
    const [sessions] = await db.query(
      `SELECT 
        COUNT(*) AS total_sessions,
        IFNULL(SUM(total_minutes), 0) AS total_minutes,
        IFNULL(SUM(total_amount), 0) AS total_amount
       FROM table_sessions
       WHERE DATE(start_time) = ?`,
      [date]
    );

    // 3️⃣ Insert day snapshot
    await db.query(
      `INSERT INTO day_snapshots
      (day_date, total_shifts, total_sessions, total_minutes, total_amount)
      VALUES (?, ?, ?, ?, ?)`,
      [
        date,
        shifts[0].total_shifts,
        sessions[0].total_sessions,
        sessions[0].total_minutes,
        sessions[0].total_amount
      ]
    );

    return res.json({
      success: true,
      message: "Day closed successfully"
    });

  } catch (err) {
    console.error("DAY CLOSE ERROR:", err);
    return res.status(500).json({ success: false });
  }
};
