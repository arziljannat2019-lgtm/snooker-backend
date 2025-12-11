import db from "../db.js";

export const closeShift = (req, res) => {
  const { branch_code, shift_no, start_time, end_time, total_amount, canteen_total, total_sessions } = req.body;
  const sql = `
    INSERT INTO shifts
      (branch_code, shift_no, start_time, end_time, total_amount, canteen_total, total_sessions)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [branch_code, shift_no, start_time, end_time, total_amount || 0, canteen_total || 0, total_sessions || 0], (err) => {
    if (err) return res.json({ success: false });
    res.json({ success: true });
  });
};
