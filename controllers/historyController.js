const db = require("../db");

exports.getTableHistory = (req, res) => {
  const { table_id } = req.query;
  if (!table_id) return res.json([]);
  const sql = `
    SELECT id, table_id, start_time, end_time, total_amount
    FROM table_sessions
    WHERE table_id = ?
    ORDER BY id DESC
  `;
  db.query(sql, [table_id], (err, rows) => {
    if (err) return res.status(500).json([]);
    res.json(rows);
  });
};

exports.getDayHistory = (req, res) => {
  const sql = `
    SELECT id, date, shift1_json, shift2_json, combined_json
    FROM day_closings
    ORDER BY id DESC
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json([]);
    const formatted = rows.map(r => ({
      id: r.id,
      date: r.date,
      shift1: JSON.parse(r.shift1_json || "{}"),
      shift2: JSON.parse(r.shift2_json || "{}"),
      combined: JSON.parse(r.combined_json || "{}")
    }));
    res.json(formatted);
  });
};

exports.getRangeHistory = (req, res) => {
  const { start, end } = req.query;
  if (!start || !end) return res.json([]);

  const sql = `
    SELECT id, date, shift1_json, shift2_json, combined_json
    FROM day_closings
    WHERE date BETWEEN ? AND ?
    ORDER BY id DESC
  `;
  db.query(sql, [start, end], (err, rows) => {
    if (err) return res.status(500).json([]);
    const formatted = rows.map(r => ({
      id: r.id,
      date: r.date,
      shift1: JSON.parse(r.shift1_json || "{}"),
      shift2: JSON.parse(r.shift2_json || "{}"),
      combined: JSON.parse(r.combined_json || "{}")
    }));
    res.json(formatted);
  });
};
