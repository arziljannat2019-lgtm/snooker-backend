const db = require("../db");

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, message: "Missing fields" });
  }

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "DB error" });
    }

    if (rows.length === 0) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const user = rows[0];

    res.json({
      success: true,
      role: user.role,
      user: {
        id: user.id,
        username: user.username
      }
    });
  });
};
