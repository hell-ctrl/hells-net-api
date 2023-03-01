const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.AUTH_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { username: payload.id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { token, refreshToken };
};

module.exports = generateToken;
