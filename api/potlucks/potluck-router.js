const router = require("express").Router();
const { restricted } = require("../auth/auth-middleware");
const { validateUserMatch, validateId } = require("./potluck-middleware");
const Potluck = require("./potluck-model");
const Item = require("../items/item-model");
const Invite = require("../invite/invite-model");

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

router.get("/", restricted, (req, res, next) => {
  //returns list of potlucks --restricted-- {owner, time, date, location}
  Potluck.getAllPotlucks()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:potluck_id", validateId, (req, res, next) => {
  //returns list of potlucks --restricted-- {owner, time, date, location}
  Potluck.findById(req.params.potluck_id)
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:potluck_id", restricted, validateUserMatch, (req, res, next) => {
  const { time, date, location, items } = req.body;
  const body = { time, date, location };
  Potluck.updateById(req.params.potluck_id, body)
    .then((resp) => {
      items.map((item) => {
        if (item.item_id) {
          Item.updateById(item.item_id, { item_name: item.item_name });
        } else if (items.length > 0) {
          console.log("here");
          Item.insertItem({
            potluck_id: resp.potluck_id,
            item_name: item,
          });
        }
      });

      Potluck.findById(resp.potluck_id).then((resp) => {
        res.status(201).json(resp);
      });
    })
    .catch(next);
});

router.get(
  "/:potluck_id/invites",
  restricted,
  validateUserMatch,
  (req, res, next) => {
    Invite.getAll(req.params.potluck_id)
      .then((resp) => {
        res.status(200).json(resp);
      })
      .catch((er) => next(er));
  }
);

router.post(
  "/:potluck_id/invites",
  restricted,
  validateUserMatch,
  async (req, res, next) => {
    try {
      const { user_id } = req.body;
      const { potluck_id } = req.params;
      const body = {
        potluck_id: potluck_id,
        user_id: user_id,
        description: req.body.description,
      };
      Invite.insertInvite(body)
        .then((resp) => {
          res.status(201).json(resp);
        })
        .catch((err) => {
          console.log(err);
          next();
        });
    } catch (er) {
      next(er);
    }
  }
);

// router.delete("/:potluck_id", (req, res, next) => {
//   //del potluck
//
// });

module.exports = router;
