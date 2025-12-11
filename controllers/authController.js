import db from "../db.js";

export const loginUser = (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username=? AND password=?";

    db.query(sql, [username, password], (err, rows) => {
        if (err || rows.length === 0)
            return res.json({ success: false });

        const user = rows[0];

        res.json({
            success: true,
            role: user.role,
            token: "ok"
        });
    });
};
