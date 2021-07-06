const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");
const crypto = require("crypto");
passport.use(
  new googleStrategy(
    {
      clientID:
        "134784209968-3p1qmnpp5ed6hdmtdtkcqfherodpg5ka.apps.googleusercontent.com",
      clientSecret: "yrDtkf9bWoh-9WFeLBxAnH5q",
      callbackURL: "http://localhost:8000/user/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in google Strategy-passport", err);
          return;
        }
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("Error in google Strategy-passport", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);
module.exports = passport;
