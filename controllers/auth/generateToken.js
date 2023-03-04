const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.AUTH_SECRET, {
    expiresIn: "15m",
  });

  const refresh_token = jwt.sign(
    { id: payload.id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { token, refresh_token };
};

const generateTokenAlternative = (req, res) => {
  const { id, adm } = req.user;

  const tokens = generateToken({ id, adm });
  res.status(200).json({
    message: "tokens gerados",
    token: tokens.token,
    refresh_token: tokens.refresh_token,
  });
};

module.exports = { generateToken, generateTokenAlternative };
