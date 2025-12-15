const db = require("../db");

exports.closeDay = async (req, res) => {
  try {
    const data = req.body;

    await db.query(
      `INSERT INTO day_snapshots
      (day_date, branch_code,
       game_total, canteen_total,
       game_collection, canteen_collection,
       expenses, closing_cash)
      VALUES (?,?,?,?,?,?,?,?)`,
      [
        data.day_date,
        data.branch_code,
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
    console.error("DAY CLOSE ERROR:", err);
    res.status(500).json({ success: false });
  }
};
