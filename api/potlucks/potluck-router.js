const router = require("express").Router();
const User = require("../users/userModel");
const Potluck = require("./potluck-model");
//middleware

router.post("/", (req, res, next) => {
  //validate body
  //insert reqbody {time, date, location, userId}
  //return new potluck
  //redirect to food add?
  req.decodedJwt.user_id;
  res.json({});
});

router.get("/", (req, res, next) => {
  //returns list of potlucks --restricted-- {owner, time, date, location}
  Potluck.getAllPotlucks()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/", (req, res, next) => {
  //validate body
  //insert reqbody {time, date, location, userId}
  //insert new foods on same page with...
  //return new potluck
  res.json({});
});

router.delete("/", (req, res, next) => {
  //del potluck
  res.json({});
});

module.exports = router;
