const passport = require("passport");
const db = require("./dbconfig");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const addUserWithGoogle = `
        INSERT INTO users(oauth_provider, oauth_id, avatar_url, email, full_name)
        VALUES(?,?,?,?,?)
        RETURNING *;
`;

const checkQuery = `SELECT * FROM users WHERE email = ?`;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existing = await db.raw(checkQuery, [profile.emails[0].value]);
        if (existing.rows.length > 0) {
          return done(null, existing.rows[0]);
        }

        const { rows } = await db.raw(addUserWithGoogle, [
          "google",
          profile.id,
          profile.photos[0].value,
          profile.emails[0].value,
          profile.displayName,
        ]);
        const user = rows[0];

        if (!user) return res.status(404).json({ message: "unsuccesfully" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
