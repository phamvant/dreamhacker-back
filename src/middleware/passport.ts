import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

import CONFIG from "../config/config.js";

const myPassport = new passport.Passport();

myPassport.use(
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

myPassport.serializeUser((user, done) => {
  done(null, user);
});

myPassport.deserializeUser((user, done) => {
  done(null, user);
});

export default myPassport;
