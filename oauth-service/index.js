const express = require("express");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth.route");
const localAuth = require("./routes/register-local.route");
const loginAuth = require("./routes/login-local.route");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use("/", authRoutes);
app.use("/auth", localAuth);
app.use("/auth/login", loginAuth);

const PORT = process.env.AUTH_PORT;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
