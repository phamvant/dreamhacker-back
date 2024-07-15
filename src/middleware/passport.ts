import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import postgres from "../db/db.js";

import CONFIG from "../config/config.js";
import { UnAuthorizedError } from "../utils/error.response.js";

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: CONFIG.AUTH0.GOOGLE.CLIENT_ID,
      clientSecret: CONFIG.AUTH0.GOOGLE.CLIENT_SECRET,
      callbackURL: `${
        CONFIG.ENV === "production" ? "https://dreamhacker.online" : ""
      }/auth/google/callback`,
    },

    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails[0];
        if (!email.verified) {
          throw new UnAuthorizedError();
        }

        const existedUser = await postgres.query(
          "SELECT * FROM federated_credentials WHERE provider = $1 AND user_id = $2",
          [profile.provider, profile.id]
        );

        if (!existedUser.rowCount) {
          const newUser = await postgres.query(
            "INSERT INTO public.user (id, email, username, avatar) VALUES ($1, $2, $3, $4)",
            [
              profile.id,
              email.value,
              profile.displayName,
              profile.photos[0].value,
            ]
          );

          const newCredential = await postgres.query(
            "INSERT INTO federated_credentials (user_id, provider) VALUES ($1, $2)",
            [profile.id, profile.provider]
          );

          const role = await postgres.query(
            `INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)`,
            [profile.id, 3]
          );

          const user = {
            id: profile.id,
            name: profile.displayName,
          };

          return done(null, user);
        } else {
          const user = await postgres.query(
            "SELECT * FROM public.user WHERE id = $1",
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
