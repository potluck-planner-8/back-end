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

module.exports = { validateId };
