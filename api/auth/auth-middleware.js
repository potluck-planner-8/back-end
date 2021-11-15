const { TOKEN_SECRET } = require("../secrets");
const jwt = require("jsonwebtoken");
const User = require("../users/userModel.js");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    next({ status: 401, message: "token required" });
  }
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return next({
        status: 401,
        message: "token invalid",
      });
    }
    req.decodedJwt = decoded;
    next();
  });
};

const only = (user_id) => (req, res, next) => {
  if (req.decodedJwt.user_id !== user_id) {
    next({
      status: 403,
      message: "This is not for you",
    });
  } else {
    next();
  }
};

const checkUsernameExists = async (req, res, next) => {
  const { username } = req.body;
  const [user] = await User.findBy({ username });
  if (!user) {
    next({ status: 401, message: "invalid credentials" });
  } else {
    req.user = user;
    next();
  }
};

async function CheckUsernameTaken(req, res, next) {
  const { username } = req.body;
  const [oldUser] = await User.findBy({ username });
  if (oldUser) {
    next({ status: 400, message: "username taken" });
  }
  next();
}

module.exports = {
  restricted,
  only,
  checkUsernameExists,
  CheckUsernameTaken,
};
