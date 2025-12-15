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
    const { table_id, frame_rate, century_rate, play_type } = req.body;

    // basic validation
    if (!table_id || !play_type) {
      return res.json({
        success: false,
        message: "table_id and play_type required"
      });
    }

    if (play_type === "frame" && !frame_rate) {
      return res.json({
        success: false,
        message: "frame_rate required"
      });
    }

    if (play_type === "century" && !century_rate) {
      return res.json({
        success: false,
        message: "century_rate required"
      });
    }

    // check if table already running
    const [running] = await db.query(
      `SELECT id FROM table_sessions 
       WHERE table_id = ? AND end_time IS NULL
       LIMIT 1`,
      [table_id]
    );

    if (running.length > 0) {
      return res.json({
        success: false,
        message: "Table already running"
      });
    }

    // insert new session
    await db.query(
      `INSERT INTO table_sessions 
      (table_id, start_time, frame_rate, century_rate, play_type)
      VALUES (?, NOW(), ?, ?, ?)`,
      [
        table_id,
        frame_rate || 0,
        century_rate || 0,
        play_type
      ]
    );

    return res.json({ success: true });

  } catch (err) {
    console.error("START TABLE ERROR:", err);
    res.status(500).json({ success: false, error: "Server error" });
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
      return res.json({
        success: false,
        message: "table_id required"
      });
    }

    // get running session
    const [rows] = await db.query(
      `SELECT * FROM table_sessions
       WHERE table_id = ? AND end_time IS NULL
       ORDER BY id DESC
       LIMIT 1`,
      [table_id]
    );

    if (rows.length === 0) {
      return res.json({
        success: false,
        message: "No running session"
      });
    }

    const session = rows[0];

    // time calculation
    const startTime = new Date(session.start_time);
    const endTime = new Date();

    const diffMs = endTime - startTime;
    const totalMinutes = Math.ceil(diffMs / 60000);

    // rate selection (IMPORTANT)
    let rate = 0;
    if (session.play_type === "frame") {
      rate = session.frame_rate;
    } else {
      rate = session.century_rate;
    }

    const totalAmount = totalMinutes * rate;

    // update session
    await db.query(
      `UPDATE table_sessions
       SET end_time = NOW(),
           total_minutes = ?,
           total_amount = ?
       WHERE id = ?`,
      [totalMinutes, totalAmount, session.id]
    );

    return res.json({
      success: true,
      minutes: totalMinutes,
      amount: totalAmount
    });

  } catch (err) {
    console.error("STOP TABLE ERROR:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
