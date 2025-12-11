import db from "../db.js";

export const syncOfflineSessions = (req, res) => {
    const sessions = req.body.sessions;

    if (!sessions || sessions.length === 0)
        return res.json({ success: true });

    let insertSQL = `
        INSERT INTO table_sessions 
        (table_id, branch_code, rate_type, frame_rate, century_rate, start_time, end_time, total_amount, canteen_amount)
        VALUES ?
    `;

    const bulkValues = sessions.map(s => [
        s.table_id,
        s.branch_code,
        s.rate_type,
        s.frame_rate,
        s.century_rate,
        s.start_time,
        s.end_time,
        s.total_amount,
        s.canteen_amount
    ]);

    db.query(insertSQL, [bulkValues], (err) => {
        if (err) return res.json({ success: false });

        res.json({ success: true });
    });
};
