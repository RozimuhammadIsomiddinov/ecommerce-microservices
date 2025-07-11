const db = require("../config/dbconfig");
const bcrypt = require("bcryptjs");
const JWT = require("../lib/jwt");

const addUser = `
        INSERT INTO users (email, full_name, password)
        VALUES(?,?,?)
 RETURNING id, email, full_name;`;

const registerUser = async (req, res) => {
  const { full_name, password, email } = req.body;

  if (!full_name || !password || !email)
    return res.status(400).json({ message: "fill all fields" });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await db.raw(addUser, [email, full_name, hashedPassword]);
    const user = rows[0];

    if (!user) return res.status(404).json({ message: "unsuccesfully" });

    const jwtInstance = new JWT({ id: user.id, email: user.email });
    const token = jwtInstance.sign();

    return res.status(201).json({ user, token });
  } catch (e) {
    if (e.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    res
      .status(500)
      .json({ message: "error from registerUser", error: e.message });
  }
};

module.exports = { registerUser };
