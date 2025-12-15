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
// START TABLE (FIXED)
exports.startTable = async (req, res) => {
  try {
    const { table_id, frame_rate, century_rate } = req.body;

    // 🔹 ensure table exists (UPSERT)
    await db.query(
      `INSERT INTO snooker_tables (id, name, frame_rate, century_rate, status)
       VALUES (?, ?, ?, ?, 'running')
       ON DUPLICATE KEY UPDATE
         frame_rate = VALUES(frame_rate),
         century_rate = VALUES(century_rate),
         status='running'`,
      [table_id, `Table ${table_id}`, frame_rate, century_rate]
    );

    // 🔹 create session
    await db.query(
      "INSERT INTO table_sessions (table_id, start_time) VALUES (?, NOW())",
      [table_id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("START TABLE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// STOP TABLE (FIXED)
exports.stopTable = async (req, res) => {
  try {
    const { table_id } = req.body;

    // 🔍 last session lo (end_time ignore)
    const [[session]] = await db.query(
      "SELECT * FROM table_sessions WHERE table_id=? ORDER BY id DESC LIMIT 1",
      [table_id]
    );

    if (!session || session.end_time) {
      return res.json({
        success: false,
        message: "No running session found"
      });
    }

    const start = new Date(session.start_time);
    const end = new Date();
    const minutes = Math.ceil((end - start) / 60000);

    // table rate
const [[table]] = await db.query(
  "SELECT frame_rate FROM snooker_tables WHERE id=?",
  [table_id]
);

if (!table) {
  return res.json({
    success: false,
    message: "Table not found in snooker_tables"
  });
}


    const amount = minutes * table.frame_rate;

    // close session
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
    res.status(500).json({ error: err.message });
  }
};

