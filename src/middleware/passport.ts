import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import postgres from "../db/db.js";

import CONFIG from "../config/config.js";

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: CONFIG.AUTH0.GOOGLE.CLIENT_ID,
      clientSecret: CONFIG.AUTH0.GOOGLE.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, done) {
      try {
        const existedUser = await postgres.query(
          "SELECT * FROM federated_credentials WHERE provider = $1 AND user_id = $2",
          ["https://www.facebook.com", profile.id]
        );

        // console.log(profile);
        if (!existedUser.rowCount) {
          const newUser = await postgres.query(
            "INSERT INTO public.user (id, email, username) VALUES ($1, $2, $3)",
            [profile.id, "thuan@gmail.com", profile.displayName]
          );

          const newCredential = await postgres.query(
            "INSERT INTO federated_credentials (user_id, provider) VALUES ($1, $2)",
            [profile.id, "https://www.facebook.com"]
          );

          const user = {
            id: profile.id,
            name: profile.displayName,
          };

          return done(null, user);
        } else {
          const user = await postgres.query(
            "SELECT * FROM users WHERE id = $1",
            [existedUser.rows[0].user_id]
          );

          if (!user.rowCount) {
            return done(null, false);
          }

          return done(null, user.rows[0]);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serialize");
  console.log(user);
  process.nextTick(function () {
    done(null, user.id);
  });
});

passport.deserializeUser((id, done) => {
  console.log("deserial");
  console.log(id);
  process.nextTick(function () {
    if (id) {
      done(null, { id: id as string });
    } else {
      done(null, null);
    }
  });
});

export default passport;
