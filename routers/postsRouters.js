const postsRouter = require("express").Router();
const isLogged = require("../middlewares/isLogged.js");
const validId = require("../middlewares/validId.js");
const createPost = require("../controllers/posts/createPost.js");
const updatePost = require("../controllers/posts/updatePost.js");
const deletePost = require("../controllers/posts/deletePost.js");
const createComment = require("../controllers/comments/createComment.js");
const updateComment = require("../controllers/comments/updateComment.js");
const deleteComment = require("../controllers/comments/deleteComment.js");
const { savePost, findSavedPosts, deleteSavedPost } = require("../controllers/posts/savePost.js");
const { likePost, deslikePost } = require("../controllers/posts/likePost.js");
const { findPost, findAllPosts, findPostsByText } = require("../controllers/posts/findPost.js");

postsRouter.post("/", isLogged, createPost);
postsRouter.get("/", findAllPosts);

postsRouter.patch("/comment/:id", validId, isLogged, updateComment);
postsRouter.delete("/comment/:id", validId, isLogged, deleteComment);
postsRouter.post("/comment/:id", validId, isLogged, createComment);

postsRouter.patch("/like/:id", validId, isLogged, likePost);
postsRouter.patch("/deslike/:id", validId, isLogged, deslikePost);

postsRouter.get("/search", findPostsByText);

postsRouter.get("/save", isLogged, findSavedPosts);
postsRouter.delete("/save/:id", isLogged, validId, deleteSavedPost);
postsRouter.post("/save/:id", validId, isLogged, savePost);

postsRouter.get("/:id", validId, findPost);
postsRouter.delete("/:id", validId, isLogged, deletePost);
postsRouter.patch("/:id", validId, isLogged, updatePost);

module.exports = postsRouter;
