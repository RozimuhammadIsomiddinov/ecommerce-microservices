const express = require("express");
const { registerUser } = require("../controller/register");

const router = express.Router();

router.post("/register-local", registerUser);
module.exports = router;
