const express = require("express");
const Menoter = require("../models/Menoter.js");
const passport = require("passport");
const moment = require("moment");

require("../config/passport.js")(passport);

const router = express.Router();

function getToken(headers) {
  const splited = headers.authorization.split(" ");
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

router.get("/pages/task", function(req, res, next) {
  Menoter.find()
    .countDocuments()
    .exec(function(err, list) {
      if (err) return next(err);
      res.json(list);
    });
});

router.post("/pages/task", function(req, res, next) {
  let taskDetails = {
    taskName: req.body.name,
    taskDesc: req.body.description
  };

  Menoter.findOneAndUpdate(
    { mentor_email: req.body.email },
    { $push: { mentor_task: taskDetails } },
    (err, data) => {
      if (err) return next(err);
      res.json(data);
    }
  );
});

router.get("/:id", function(req, res, next) {
  Menoter.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    console.log("edit user", post);
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
    let insertData = {
      mentor_name: req.body.name,
      mentor_email: req.body.email,
      $push: {
        mentor_task: {
          taskName: req.body.mentor_task ? req.body.mentor_task : null,
          taskDesc: req.body.mentor_task ? req.body.mentor_task : null
        }
      }
    };
    Menoter.create(insertData, (err, mentor) => {
      if (err) return next(err);
      res.json(mentor);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

router.put("/:id", (req, res, next) => {
  let task = {
    $push: {
      mentor_task: req.body.task
    }
  };

  let reqData = {
    mentor_name: req.body.name,
    mentor_email: req.body.email,
    write_date: moment()
  };
  if (req.body.task.length > 0) {
    task = {
      $set: {
        mentor_task: req.body.task
      }
    };
  }
  Object.assign(reqData, task);
  Menoter.findByIdAndUpdate(req.params.id, reqData, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete("/:id", (req, res, next) => {
  Menoter.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
