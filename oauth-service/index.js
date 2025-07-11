const express = require("express");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth");
const localAuth = require("./routes/register-local");
const loginAuth = require("./routes/login-local");
require("dotenv").config();

const app = express();
app.use(express.json()); // JSON uchun
app.use(express.urlencoded({ extended: true })); // form-data uchun

app.use(passport.initialize());
app.use("/", authRoutes);
app.use("/auth", localAuth);
app.use("/auth-login", loginAuth);
const PORT = process.env.AUTH_PORT;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
