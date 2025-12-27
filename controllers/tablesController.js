const db = require("../db");

/*
=====================================
START TABLE
=====================================
Frontend se aata hai:
table_id
frame_rate
century_rate
play_type  -> "frame" | "century"
*/

exports.startTable = async (req, res) => {
  try {
    const {
      table_id,
      play_type,
      frame_rate,
      century_rate
      // branch_code IGNORE karna hai
    } = req.body;

    if (!table_id || !frame_rate) {
      return res.status(400).json({
        success: false,
        message: "table_id & frame_rate required"
      });
    }

    const [running] = await db.query(
      "SELECT * FROM table_sessions WHERE table_id = ? AND end_time IS NULL",
      [table_id]
    );

    if (running.length > 0) {
      return res.json({
        success: false,
        message: "Table already running"
      });
    }

    await db.query(
      `INSERT INTO table_sessions
       (table_id, start_time, frame_rate, century_rate, play_type)
       VALUES (?, NOW(), ?, ?, ?)`,
      [
        table_id,
        frame_rate,
        century_rate || 0,
        play_type || "frame"
      ]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("START TABLE ERROR:", err);
    res.status(500).json({ success: false });
  }
};




/*
=====================================
STOP TABLE
=====================================
Frontend se aata hai:
table_id
*/

exports.stopTable = async (req, res) => {
  try {
    const { table_id } = req.body;

    if (!table_id) {
      return res.status(400).json({
        success: false,
        message: "table_id required"
      });
    }

    const [rows] = await db.query(
      "SELECT * FROM table_sessions WHERE table_id = ? AND end_time IS NULL",
      [table_id]
    );

    if (rows.length === 0) {
      return res.json({
        success: false,
        message: "No running session"
      });
    }

    const session = rows[0];
    const minutes = Math.ceil(
      (Date.now() - new Date(session.start_time)) / 60000
    );

    const rate =
      session.play_type === "century"
        ? session.century_rate
        : session.frame_rate;

    const amount = minutes * rate;

    await db.query(
      `UPDATE table_sessions
       SET end_time = NOW(),
           total_minutes = ?,
           total_amount = ?
       WHERE id = ?`,
      [minutes, amount, session.id]
    );

    res.json({
      success: true,
      minutes,
      amount
    });
  } catch (err) {
    console.error("STOP TABLE ERROR:", err);
    res.status(500).json({ success: false });
  }
};

