const Potluck = require("./potluck-model");

async function validateId(req, res, next) {
  Potluck.findById(req.params.id)
    .then((potluck) => {
      if (potluck) {
        req.potluck = potluck;
        next();
      } else {
        next({ status: 404 });
      }
    })
    .catch(next);
}

async function validateUserMatch(req, res, next) {
  const potLuck = await Potluck.findById(req.params.potluck_id);
  if (req.decodedJwt.user_id !== potLuck.user_id) {
    next({
      status: 403,
      message: "This is not for you",
    });
  } else {
    next();
  }
}

module.exports = { validateId, validateUserMatch };
