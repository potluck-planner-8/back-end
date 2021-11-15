const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../secrets");

module.exports = function buildToken(user) {
  const payload = {
    user_id: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, TOKEN_SECRET, options);
};
