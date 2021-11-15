const router = require("express").Router();
const User = require("../users/userModel");
//authmiddleware
const bcrypt = require("bcryptjs");
//buildtoken

//post register
router.post("/register", (req, res) => {
  const newUser = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 6;
  const hashed = bcrypt.hashSync(newUser.password, rounds);
  newUser.password = hashed;
  User.insertUser(newUser)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      next(err);
    });
});
//post login

module.exports = router;
