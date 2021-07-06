const express = require("express");
const port = 8000;
const app = express();
app.get("/", function (req, res) {
  return res.send("Welcome to finance App");
});
app.listen(port, function (err) {
  if (err) {
    console.log("Error in creating App", err);
  }
  console.log("Server is running on port:", port);
});
