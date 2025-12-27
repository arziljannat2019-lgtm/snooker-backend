const db = require("../db");


/**
 * CLOSE SHIFT
 * Frontend sends: shift_number, game_total, closing_cash
 */
exports.closeShift = async (req, res) => {
  try {
    const { shift_no, game_total, closing_cash } = req.body;

    if (!shift_no) {
      return res.status(400).json({ success: false });
    }

    await db.query(
      `INSERT INTO shift_snapshots
       (shift_no, game_total, closing_cash, created_at)
       VALUES (?, ?, ?, NOW())`,
      [shift_no, game_total || 0, closing_cash || 0]
    );

    res.json({ success: true, message: "Shift closed successfully" });
  } catch (err) {
    console.error("SHIFT CLOSE ERROR:", err);
    res.status(500).json({ success: false });
  }
};
