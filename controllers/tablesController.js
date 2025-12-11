const db = require("../db");

// CHECK-IN
exports.checkInTable = (req, res) => {
    const {
        table_id,
        rate_type,
        frame_rate,
        century_rate,
        branch_code
    } = req.body;

    const sql = `
        INSERT INTO table_sessions 
        (table_id, branch_code, rate_type, frame_rate, century_rate, start_time)
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    db.query(sql,
        [table_id, branch_code, rate_type, frame_rate, century_rate],
        (err) => {
            if (err) return res.json({ success: false });
            res.json({ success: true });
        }
    );
};

// CHECK-OUT
exports.checkOutTable = (req, res) => {
    const { table_id, canteen_amount } = req.body;

    const sql = `
        UPDATE table_sessions
        SET end_time = NOW(), canteen_amount = ?
        WHERE table_id = ? AND end_time IS NULL
        ORDER BY id DESC LIMIT 1
    `;

    db.query(sql, [canteen_amount, table_id], (err) => {
        if (err) return res.json({ success: false });
        res.json({ success: true });
    });
};

// HISTORY
exports.getTableHistory = (req, res) => {
    const { table_id, branch } = req.query;

    const sql = `
        SELECT * FROM table_sessions
        WHERE table_id = ? AND branch_code = ?
        ORDER BY id DESC
    `;

    db.query(sql, [table_id, branch], (err, rows) => {
        if (err) return res.json([]);
        res.json(rows);
    });
};
