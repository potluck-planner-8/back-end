const router = require("express").Router();
const User = require("./userModel");

router.get("/", async (req, res) => {
  res.json(await User.getAllUsers());
});

router.post("/", async (req, res) => {
  res.status(201).json(await User.insertUser(req.body));
});

module.exports = router;
