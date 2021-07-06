const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/finance_db");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Successfully connected to the database");
});
module.exports = db;
