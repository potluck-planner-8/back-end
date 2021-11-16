const router = require("express").Router();
const User = require("../users/userModel");
const {
  checkUsernameExists,
  CheckUsernameTaken,
  ValidateBody,
} = require("./auth-middleware");
const bcrypt = require("bcryptjs");
const tokenBuilder = require("./token-builder.js");

router.post("/register", CheckUsernameTaken, (req, res, next) => {
  const newUser = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 6;
  const hashed = bcrypt.hashSync(newUser.password, rounds);
  newUser.password = hashed;
  User.insertUser(newUser)
    .then((resp) => {
      res.status(201).json({ resp, hashed });
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
  "/login",
  ValidateBody,
  checkUsernameExists,
  async (req, res, next) => {
    try {
      const { password } = req.body;
      const passwordValidated = bcrypt.compareSync(password, req.user.password);
      if (passwordValidated) {
        const token = tokenBuilder(req.user);
        res.status(200).json({
          message: `${req.user.username} is back!`,
          token,
        });
      } else {
        next({ status: 401, message: "Invalid Credentials" });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
