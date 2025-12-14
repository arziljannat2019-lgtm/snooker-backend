const db = require("../db");
const bcrypt = require("bcryptjs");

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], async (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: "DB error" });
    }

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    res.json({
      success: true,
      role: user.role,
      token: "ok"
    });
  });
};
