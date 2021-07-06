const passport = require("passport");
const express = require("express");

const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);
router.get("/sign-out", userController.signOut);

router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
  userController.createSession
);

module.exports = router;
