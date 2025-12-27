const db = require("../db");

exports.startTable = async (req, res) => {
  try {
    const { table_id, frame_rate, century_rate, play_type } = req.body;

    if (!table_id) {
      return res.status(400).json({ success: false, message: "table_id required" });
    }

    const [running] = await db.query(
      "SELECT id FROM table_sessions WHERE table_id = ? AND end_time IS NULL",
      [table_id]
    );

    if (running.length > 0) {
      return res.json({ success: false, message: "Table already running" });
    }

    await db.query(
      `INSERT INTO table_sessions 
       (table_id, start_time, frame_rate, century_rate, play_type)
       VALUES (?, NOW(), ?, ?, ?)`,
      [table_id, frame_rate || 0, century_rate || 0, play_type || "frame"]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("START TABLE ERROR:", err);
    res.status(500).json({ success: false });
  }
};
