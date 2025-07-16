const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/product", productRoute);
module.exports = app;
