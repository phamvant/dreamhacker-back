import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

import CONFIG from "../config/config.js";

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: CONFIG.AUTH0.GOOGLE.CLIENT_ID,
      clientSecret: CONFIG.AUTH0.GOOGLE.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    },
  ),
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
