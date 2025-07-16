const express = require("express");
const router = express.Router();
const forwardRequest = require("../utils/proxy");
const { PRODUCT_SERVICE_URL } = require("../config/services");
router.use("/", (req, res) => {
  forwardRequest(req, res, PRODUCT_SERVICE_URL);
});
module.exports = router;
