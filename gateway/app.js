const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

module.exports = app;
