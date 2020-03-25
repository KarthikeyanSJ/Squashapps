var express = require("express");
var Menoter = require("../models/Menoter.js");
var passport = require("passport");
require("../config/passport.js")(passport);

var router = express.Router();

function getToken(headers) {
  var splited = headers.authorization.split(" ");
  if (splited.length == 2) {
    return splited[1];
  } else {
    return null;
  }
}

router.get("/", function(req, res, next) {
  Menoter.find()

    .sort({ write_date: -1 })
    .exec(function(err, list) {
      if (err) return next(err);
      res.json(list);
    });
});

router.get("/pages/:id", function(req, res, next) {
  Menoter.find()

    .sort({ write_date: -1 })
    .skip((req.params.id - 1) * 5)
    .limit(5)
    .exec(function(err, list) {
      if (err) return next(err);
      res.json(list);
    });
});

router.get("/pages", function(req, res, next) {
  Menoter.find()
    .countDocuments()
    .exec(function(err, list) {
      if (err) return next(err);
      res.json(list);
    });
});

router.get("/:id", function(req, res, next) {
  Menoter.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  var token = getToken(req.headers);
  if (token) {
    Menoter.create(req.body, function(err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

router.put("/:id", function(req, res, next) {
  Menoter.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete("/:id", function(req, res, next) {
  Menoter.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
