const express = require("express");
require("dotenv").config();

const productRoute = require("./routes/product.route");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/product", productRoute);

const PORT = process.env.PRODUCT_PORT;
app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});
