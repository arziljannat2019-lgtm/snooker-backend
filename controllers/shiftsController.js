const db = require("../db");

exports.closeShift = async (req, res) => {
  try {
    const { shift_number, game_total, closing_cash } = req.body;

    if (!shift_number) {
      return res.status(400).json({ success: false, message: "shift_number required" });
    }

    await db.query(
      `INSERT INTO shift_snapshots 
       (shift_number, game_total, closing_cash, created_at)
       VALUES (?, ?, ?, NOW())`,
      [shift_number, game_total || 0, closing_cash || 0]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("SHIFT CLOSE ERROR:", err);
    res.status(500).json({ success: false });
  }
};
