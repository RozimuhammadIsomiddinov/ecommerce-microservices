const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JWT = require("../lib/jwt");
require("dotenv").config();

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = new JWT({ id: req.user.id, email: req.user.email }).sign();

    res.json({ token });
  }
);

module.exports = router;
