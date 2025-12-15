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
// START TABLE
exports.startTable = async (req, res) => {
  try {
    const { table_id, frame_rate, century_rate } = req.body;

    // table ko running karo
    await db.query(
      "UPDATE snooker_tables SET status='running', frame_rate=?, century_rate=? WHERE id=?",
      [frame_rate, century_rate, table_id]
    );

    // new session create
    await db.query(
      "INSERT INTO table_sessions (table_id, start_time) VALUES (?, NOW())",
      [table_id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("START TABLE ERROR:", err);
    res.status(500).json({ error: "start failed" });
  }
};
// STOP TABLE
exports.stopTable = async (req, res) => {
  try {
    const { table_id } = req.body;

    // last open session lo
    const [[session]] = await db.query(
      "SELECT * FROM table_sessions WHERE table_id=? AND end_time IS NULL ORDER BY id DESC LIMIT 1",
      [table_id]
    );

    if (!session) {
      return res.json({ success: false, message: "No active session" });
    }

    const start = new Date(session.start_time);
    const end = new Date();
    const minutes = Math.ceil((end - start) / 60000);

    // table rate lo
    const [[table]] = await db.query(
      "SELECT frame_rate FROM snooker_tables WHERE id=?",
      [table_id]
    );

    const amount = minutes * table.frame_rate;

    // session close
    await db.query(
      "UPDATE table_sessions SET end_time=NOW(), total_minutes=?, total_amount=? WHERE id=?",
      [minutes, amount, session.id]
    );

    // table idle
    await db.query(
      "UPDATE snooker_tables SET status='idle' WHERE id=?",
      [table_id]
    );

    res.json({
      success: true,
      minutes,
      amount
    });
  } catch (err) {
    console.error("STOP TABLE ERROR:", err);
    res.status(500).json({ error: "stop failed" });
  }
};
