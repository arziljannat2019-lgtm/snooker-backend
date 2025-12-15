const db = require("../db");

exports.closeDay = async (req, res) => {
  try {
    const {
      date,
      game_total,
      canteen_total,
      game_collection,
      canteen_collection,
      expenses,
      closing_cash
    } = req.body;

    if (!date) {
      return res.json({ success: false, message: "date required" });
    }

    await db.query(
      `INSERT INTO day_snapshots
       (day_date, game_total, canteen_total,
        game_collection, canteen_collection,
        expenses, closing_cash)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        date,
        game_total || 0,
        canteen_total || 0,
        game_collection || 0,
        canteen_collection || 0,
        expenses || 0,
        closing_cash || 0
      ]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("DAY CLOSE ERROR:", err);
    res.status(500).json({ success: false });
  }
};
