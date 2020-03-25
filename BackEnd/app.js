var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var passport = require("passport");
require("./config/passport.js")(passport);

var mentor = require("./routes/mentor");
var auth = require("./routes/auth");
var app = express();

var mongoose = require("mongoose");

var cors = require("cors");

var PORT = 3001;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "../build")));

// CORS
app.use(cors());

//mongoose.Promise = require("bluebird");
mongoose
  .connect("mongodb://localhost:27017/mentor-app", {
    useNewUrlParser: true,
    promiseLibrary: require("bluebird")
  })
  .then(() => console.log("Successfully Database Connect!"))
  .catch(err => console.error(err));

app.use("/api/post", mentor);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  return res.end("Successfully Working API Server!");
});

app.use(function(req, res, next) {
  var err = new Error("404 Not Found");
  err.status = 404;
  next(err);
});

app.listen(PORT);

module.exports = app;
