const router = require("express").Router();
const { restricted } = require("../auth/auth-middleware");
const { validateUserMatch } = require("./potluck-middleware");
const Potluck = require("./potluck-model");
const Item = require("../items/item-model");

router.post("/", restricted, async (req, res, next) => {
  try {
    const { time, date, location, items } = req.body;

    const user_id = req.decodedJwt.user_id;

    const body = { user_id, time, date, location };
    Potluck.insertPotluck(body)
      .then((resp) => {
        if (items.length > 0) {
          items.map((item) => {
            Item.insertItem({ potluck_id: resp.potluck_id, item_name: item });
          });
        }
        Potluck.findById(resp.potluck_id).then((resp) => {
          res.status(201).json(resp);
        });
      })
      .catch(next);
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

router.put(
  "/:potluck_id",
  restricted,
  validateUserMatch,
  async (req, res, next) => {
    try {
      const changes = await Potluck.updateById(req.params.potluck_id, req.body);
      res.status(200).json(changes);
    } catch (er) {
      next(er);
    }
  }
);
// router.put("/:potluck_id", (req, res, next) => {
//   //validate body
//   //insert reqbody {time, date, location, userId}
//   //insert new foods on same page with...
//   //return new potluck
//
// });

// router.delete("/:potluck_id", (req, res, next) => {
//   //del potluck
//
// });

module.exports = router;
