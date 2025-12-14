const db = require("../db");

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  console.log("REQ BODY:", req.body);

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing fields"
    });
  }

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, rows) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "DB error"
      });
    }

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const user = rows[0];

    // ✅ RESPONSE MUST END HERE
    return res.json({
      success: true,
      role: user.role,
      token: "ok"
    });
  });
};
