const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user");
const crypto = require("crypto");

passport.use(
  new FacebookStrategy(
    {
      clientID: "792034658037221",
      clientSecret: "ff6e0068ac04a1e7a586e77139a42c46",
      callbackURL: "http://localhost:8000/user/auth/facebook/callback",
      // passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        User.findOne({ "facebook.id": profile.id }, function (err, user) {
          if (err) return done(err);
          if (user) return done(null, user);
          else {
            var newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name = profile.displayName;
            newUser.name = profile.displayName;
            // newUser.facebook.email = profile.emails[0].value;

            newUser.save(function (err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
        });
        ``;
      });
    }
  )
);
module.exports = passport;
