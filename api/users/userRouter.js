const router = require("express").Router();
const User = require("./userModel");

router.get("/", async (req, res) => {
  res.json(await User.getAllUsers());
});

//router.get("/:user_id", {});

//router.get("/:user_id/invites", {});

module.exports = router;
