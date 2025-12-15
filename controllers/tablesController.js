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

// START TABLE — RATE FROM FRONTEND
exports.startTable = async (req, res) => {
  try {
    const { table_id, rate, play_type } = req.body;

    if (!table_id || !rate) {
      return res.json({
        success: false,
        message: "table_id and rate required"
      });
    }

    // ensure table exists (status only)
    await db.query(
      `INSERT INTO snooker_tables (id, name, status)
       VALUES (?, ?, 'running')
       ON DUPLICATE KEY UPDATE status='running'`,
      [table_id, `Table ${table_id}`]
    );

    // create session WITH RATE
    await db.query(
      `INSERT INTO table_sessions
       (table_id, start_time, rate, play_type)
       VALUES (?, NOW(), ?, ?)`,
      [table_id, rate, play_type || "frame"]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("START TABLE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// STOP TABLE — USE SESSION RATE
exports.stopTable = async (req, res) => {
  try {
    const { table_id } = req.body;

    const [[session]] = await db.query(
      `SELECT * FROM table_sessions
       WHERE table_id=?
       ORDER BY id DESC LIMIT 1`,
      [table_id]
    );

    if (!session || session.end_time) {
      return res.json({
        success: false,
        message: "No running session"
      });
    }

    const start = new Date(session.start_time);
    const end = new Date();
    const minutes = Math.ceil((end - start) / 60000);

    // ⭐ RATE FROM SESSION (frontend ka rate)
    const amount = minutes * session.rate;

    await db.query(
      `UPDATE table_sessions
       SET end_time=NOW(),
           total_minutes=?,
           total_amount=?
       WHERE id=?`,
      [minutes, amount, session.id]
    );

    await db.query(
      "UPDATE snooker_tables SET status='idle' WHERE id=?",
      [table_id]
    );

    res.json({
      success: true,
      minutes,
      rate: session.rate,
      amount
    });
  } catch (err) {
    console.error("STOP TABLE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
