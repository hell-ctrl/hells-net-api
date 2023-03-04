const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyRefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.body.refresh_token;
    const isValid = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (isValid && req.user.id == isValid.id) {
      next()
    }
    res.status(401).json({ message: "não autorizado" });
  } catch {
    res.status(401).json({ message: "não autorizado" });
  }
};

module.exports = verifyRefreshToken;