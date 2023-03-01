const jwt = require("jsonwebtoken");
require("dotenv").config();

const isLogged = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    
    const user = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = user;
    next();
  } catch {
    res.status(401).json({ erro: "não autorizado" });
  }
};

module.exports = isLogged;
