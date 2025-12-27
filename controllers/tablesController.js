const db = require("../config/db");

/**
 * START TABLE (CHECK-IN)
 * Frontend expects: table_id, frame_rate, century_rate, play_type
 */
exports.startTable = async (req, res) => {
  try {
    const { table_id, frame_rate, century_rate, play_type } = req.body;

    if (!table_id) {
      return res.status(400).json({ success: false, message: "table_id required" });
    }

    // Check if table already running
    const [running] = await db.query(
      `SELECT id FROM table_sessions 
       WHERE table_id = ? AND end_time IS NULL`,
      [table_id]
    );

    if (running.length > 0) {
      return res.json({ success: false, message: "Table already running" });
    }

    await db.query(
      `INSERT INTO table_sessions 
       (table_id, start_time, frame_rate, century_rate, play_type)
       VALUES (?, NOW(), ?, ?, ?)`,
      [table_id, frame_rate, century_rate, play_type]
    );

    res.json({ success: true, message: "Table started" });
  } catch (err) {
    console.error("START TABLE ERROR:", err);
    res.status(500).json({ success: false });
  }
};

/**
 * STOP TABLE (CHECK-OUT)
 */
exports.stopTable = async (req, res) => {
  try {
    const { table_id, total_amount } = req.body;

    await db.query(
      `UPDATE table_sessions 
       SET end_time = NOW(), total_amount = ?
       WHERE table_id = ? AND end_time IS NULL`,
      [total_amount || 0, table_id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("STOP TABLE ERROR:", err);
    res.status(500).json({ success: false });
  }
};
