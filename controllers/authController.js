const db = require("../db");

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    const [rows] = await db.query(sql, [username, password]);

    if (rows.length === 0) {
      return res.json({ success: false });
    }

    const user = rows[0];

    res.json({
      success: true,
      role: user.role,
      token: "ok"
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
