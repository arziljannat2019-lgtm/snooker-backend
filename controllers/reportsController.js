const db = require("../db");

exports.getDailyReport = (req, res) => {
  const { branch, date } = req.query;
  if (!branch || !date) return res.json({});
  const sql = `
    SELECT 
      COALESCE(SUM(total_amount),0) AS total_play,
      COALESCE(SUM(canteen_amount),0) AS total_canteen,
      COUNT(*) AS sessions_count
    FROM table_sessions
    WHERE branch_code=? AND DATE(start_time)=?
  `;
  db.query(sql, [branch, date], (err, rows) => {
    if (err) return res.status(500).json({});
    res.json(rows[0] || {});
  });
};

exports.getMonthlyReport = (req, res) => {
  const { branch, month } = req.query;
  if (!branch || !month) return res.json({});
  const sql = `
    SELECT
      COALESCE(SUM(total_amount),0) AS total_play,
      COALESCE(SUM(canteen_amount),0) AS total_canteen,
      COUNT(*) AS sessions_count
    FROM table_sessions
    WHERE branch_code=? AND DATE_FORMAT(start_time, '%Y-%m')=?
  `;
  db.query(sql, [branch, month], (err, rows) => {
    if (err) return res.status(500).json({});
    res.json(rows[0] || {});
  });
};

exports.getSummaryReport = (req, res) => {
  const { branch } = req.query;
  if (!branch) return res.json({});
  const sql = `
    SELECT
      COALESCE(SUM(total_amount),0) AS total_play,
      COALESCE(SUM(canteen_amount),0) AS total_canteen,
      COUNT(*) AS sessions_count
    FROM table_sessions
    WHERE branch_code=?
  `;
  db.query(sql, [branch], (err, rows) => {
    if (err) return res.status(500).json({});
    res.json(rows[0] || {});
  });
};
