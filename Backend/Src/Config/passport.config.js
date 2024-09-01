const passport = require("passport");
const userModel = require("../Models/user.model");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GOOGLE_SCOPE,
} = require(".");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log(id);

    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

console.log(GOOGLE_CALLBACK_URL);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: GOOGLE_SCOPE,
      accessType: "offline",
      prompt: "consent",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const userData = {
          accessToken,
          refreshToken,
          ...profile,
        };
        console.log(accessToken, refreshToken, profile);

        done(null, userData);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
