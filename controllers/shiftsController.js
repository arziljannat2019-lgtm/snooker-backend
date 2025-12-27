const db = require("../db");

exports.closeShift = async (req, res) => {
  try {
    const data = req.body;

    await db.query(
      `INSERT INTO shift_snapshots
      (shift_number, branch_code, open_time, close_time,
       game_total, canteen_total,
       game_collection, canteen_collection,
       expenses, closing_cash)
      VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        data.shift_number,
        data.branch_code,
        data.open_time,
        data.close_time,
        data.game_total,
        data.canteen_total,
        data.game_collection,
        data.canteen_collection,
        data.expenses,
        data.closing_cash
      ]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("SHIFT CLOSE ERROR:", err);
    res.status(500).json({ success: false });
  }
};
