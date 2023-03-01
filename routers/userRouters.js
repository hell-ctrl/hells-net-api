const userRouter = require("express").Router();
const isLogged = require("../middlewares/isLogged.js");
const updateUser = require("../controllers/user/updateUser.js");
const deleteUser = require("../controllers/user/deleteUser.js");
const { findUser, findAllUsers, findUsersByText } = require("../controllers/user/findUser.js");

userRouter.patch("/", isLogged, updateUser);
userRouter.delete("/", isLogged, deleteUser);
userRouter.get("/", findAllUsers);
userRouter.get("/search", findUsersByText);
userRouter.get("/:user", findUser);

module.exports = userRouter;
