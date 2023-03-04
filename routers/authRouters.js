const authrouter = require("express").Router();
const signin = require("../controllers/auth/signin.js");
const signup = require("../controllers/auth/signup.js");
const isLogged = require("../middlewares/isLogged.js");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken.js");
const { generateTokenAlternative } = require("../controllers/auth/generateToken.js");

authrouter.post("/signup", signup);
authrouter.post("/signin", signin);
authrouter.post("/refresh", isLogged, verifyRefreshToken, generateTokenAlternative);

module.exports = authrouter;