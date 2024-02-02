const mongoose = require("mongoose");

const connect = function (callback) {
  mongoose.set("debug", true);
  mongoose.connect("mongodb://0.0.0.0:27017/reddit");

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, " Connection error"));
  db.once("open", function () {
    console.log("Database connection established");
    callback();
  });
};

module.exports.connect = connect;
