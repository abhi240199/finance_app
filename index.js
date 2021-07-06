const express = require("express");
const port = 8000;
const db = require("./config/mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const passport = require("./config/passport-local-strategy");
const session = require("express-session");
const MongoStore = require("connect-mongo");
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));
app.use(
  session({
    name: "finance",
    secret: "finance_session",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 100000,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/finance_db",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in creating App", err);
    return;
  }
  console.log("Server is running on port:", port);
});
