const db = require("../db");

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing fields"
      });
    }

    console.log("LOGIN TRY:", username);

    const [rows] = await db.query(
      "SELECT id, username, role FROM users WHERE username = ? AND password = ? LIMIT 1",
      [username, password]
    );

    if (rows.length === 0) {
      return res.json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const user = rows[0];

    return res.json({
      success: true,
      role: user.role,
      token: "ok"
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
