const db = require("../db");

exports.closeShift = async (req, res) => {
  try {
    const { shift_number } = req.body;

    if (!shift_number) {
      return res.status(400).json({ success: false });
    }

    await db.query(
      "UPDATE shifts SET closed_at=NOW() WHERE shift_number=? AND closed_at IS NULL",
      [shift_number]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("SHIFT CLOSE ERROR:", err);
    res.status(500).json({ success: false });
  }
};
