const { GOOGLE_SCOPE } = require("../Config/index");
const passportConfig = require("../Config/passport.config");
const httpErrors = require("http-errors");

class GoogleAuthControllerClass {
  constructor() {}

  googleAuth = (req, res, next) => {
    try {
      passportConfig.authenticate("google", {
        scope: GOOGLE_SCOPE,
        accessType: "offline",
        prompt: "consent",
      })(req, res, next);
    } catch (error) {
      next(httpErrors.InternalServerError(error));
    }
  };

  googleAuthCallback = (req, res, next) => {
    try {
      console.log("callback");
      passportConfig.authenticate(
        "google",
        { failureRedirect: "/error" },
        (error, user) => {
          if (error) return res.status(500).json(error);
          if (!user) return res.status(500).json("user not found");

          req.logIn(user, (error) => {
            if (error) res.status(500).json(error);
            // return res.json(user);
            console.log(user);
          });
          res.json(req.user);
        }
      );
    } catch (error) {
      next(httpErrors.InternalServerError(error));
    }
  };
}

module.exports = GoogleAuthControllerClass;
