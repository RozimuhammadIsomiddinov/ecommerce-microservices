const express = require("express");
const router = express.Router();
const forwardRequest = require("../utils/proxy");
const { AUTH_SERVICE_URL } = require("../config/services");

router.get("/google", (req, res) => {
  res.redirect(`${AUTH_SERVICE_URL}/auth/google`);
});
router.use("/", (req, res) => {
  forwardRequest(req, res, AUTH_SERVICE_URL);
});
module.exports = router;
