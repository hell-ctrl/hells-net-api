const authrouter = require("express").Router();
const signin = require("../controllers/auth/signin.js");
const signup = require("../controllers/auth/signup.js");

authrouter.post("/signup", signup);
authrouter.post("/signin", signin);

module.exports = authrouter;