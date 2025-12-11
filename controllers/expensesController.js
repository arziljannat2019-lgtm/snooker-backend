import db from "../db.js";

export const addExpense = (req, res) => {
  const { branch_code, title, amount, note } = req.body;
  const sql = "INSERT INTO expenses (branch_code, title, amount, note) VALUES (?, ?, ?, ?)";
  db.query(sql, [branch_code, title, amount || 0, note || ""], (err) => {
    if (err) return res.json({ success: false });
    res.json({ success: true });
  });
};

export const getExpenses = (req, res) => {
  const { branch, date } = req.query;
  if (!branch || !date) return res.json([]);
  const sql = "SELECT * FROM expenses WHERE branch_code=? AND DATE(created_at)=? ORDER BY id DESC";
  db.query(sql, [branch, date], (err, rows) => {
    if (err) return res.status(500).json([]);
    res.json(rows);
  });
};
