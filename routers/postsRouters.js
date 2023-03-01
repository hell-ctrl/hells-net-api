const postsRouter = require("express").Router();
const isLogged = require("../middlewares/isLogged.js");
const validId = require("../middlewares/validId.js");
const createPost = require("../controllers/posts/createPost.js");
const updatePost = require("../controllers/posts/updatePost.js");
const deletePost = require("../controllers/posts/deletePost.js");
const createComment = require("../controllers/comments/createComment.js");
const updateComment = require("../controllers/comments/updateComment.js");
const deleteComment = require("../controllers/comments/deleteComment.js");
const { likePost, deslikePost } = require("../controllers/posts/likePost.js");
const { findPost, findAllPosts } = require("../controllers/posts/findPost.js");

postsRouter.post("/", isLogged, createPost);
postsRouter.get("/", findAllPosts);
postsRouter.patch("/comment/:id", validId, isLogged, updateComment);
postsRouter.delete("/comment/:id", validId, isLogged, deleteComment);
postsRouter.post("/comment/:id", validId, isLogged, createComment);
postsRouter.patch("/like/:id", validId, isLogged, likePost);
postsRouter.patch("/deslike/:id", validId, isLogged, deslikePost)
postsRouter.get("/:id", validId, findPost);
postsRouter.delete("/:id", validId, isLogged, deletePost);
postsRouter.patch("/:id", validId, isLogged, updatePost);

module.exports = postsRouter;
