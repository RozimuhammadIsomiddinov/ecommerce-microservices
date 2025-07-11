const db = require("../config/dbconfig");
const bcrypt = require("bcryptjs");
const JWT = require("../lib/jwt");

const getUser = `
        SELECT *FROM users WHERE email = ?;
`;
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email)
    return res.status(400).json({ message: "fill all fields" });

  try {
    const { rows } = await db.raw(getUser, [email]);
    const user = rows[0];
    if (!user)
      return res
        .status(404)
        .json({ message: "user not found please register" });
    const verifiyedPassword = await bcrypt.compare(password, user.password);
    if (!verifiyedPassword)
      return res.status(400).json({ message: "password is incorrect" });

    const jwtInstance = new JWT({ id: user.id, email: user.email });
    const token = jwtInstance.sign();

    delete user.password;

    return res.status(201).json({ user, token });
  } catch (e) {
    res.status(500).json({ message: "error from loginUser", error: e.message });
  }
};

module.exports = { loginUser };
