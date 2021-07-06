const User = require("../models/user");
module.exports.create = function (req, res) {
  console.log("Req.body", req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in  creating user");
          return;
        }
        console.log("New User Created:", user);
        return res.redirect("/user/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
module.exports.signUp = function (req, res) {
  return res.render("sign_up");
};
module.exports.signIn = function (req, res) {
  return res.render("sign_in");
};
