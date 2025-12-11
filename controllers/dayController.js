const db = require("../db");

exports.saveDayClose = (req, res) => {
    const { shift1, shift2, combined } = req.body;

    const sql = `
        INSERT INTO day_closings 
        (date, shift1_json, shift2_json, combined_json) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            new Date(),
            JSON.stringify(shift1),
            JSON.stringify(shift2),
            JSON.stringify(combined)
        ],
        (err, result) => {
            if (err) {
                console.error("Day close save error:", err);
                return res.status(500).json({ message: "Database error" });
            }
            res.json({ message: "Day close saved successfully" });
        }
    );
};
