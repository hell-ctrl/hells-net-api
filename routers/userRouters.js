const userRouter = require("express").Router();
const isLogged = require("../middlewares/isLogged.js");
const validId = require("../middlewares/validId.js");
const updateUser = require("../controllers/user/updateUser.js");
const deleteUser = require("../controllers/user/deleteUser.js");
const { findUser, findAllUsers, findUsersByText } = require("../controllers/user/findUser.js");
const { followUser, unFollowUser} = require("../controllers/user/followUsers.js");

userRouter.patch("/", isLogged, updateUser);
userRouter.delete("/", isLogged, deleteUser);
userRouter.get("/", findAllUsers);
userRouter.get("/search", findUsersByText);
userRouter.post("/follow/:id", validId, isLogged, followUser);
userRouter.delete("/unfollow/:id", validId, isLogged, unFollowUser);
userRouter.get("/:user", findUser);

module.exports = userRouter;
