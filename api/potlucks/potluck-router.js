const router = require("express").Router();
const User = require("../users/userModel");
const { restricted } = require("../auth/auth-middleware");
const Potluck = require("./potluck-model");
//middleware

router.post("/", restricted, async (req, res, next) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      req.body.user_id = req.decodedJwt.user_id;
    }
    const potluck = await Potluck.insertPotluck(req.body);
    res.status(201).json(potluck);
  } catch (er) {
    next(er);
  }
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

router.get("/:potluck_id", (req, res, next) => {
  //returns list of potlucks --restricted-- {owner, time, date, location}
  Potluck.findById(req.params.potluck_id)
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
