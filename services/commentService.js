const comment = require("../models/Comment.js");

const createCommentService = (body) => comment.create(body);

const updateCommentService = (id, body) =>
  comment.findOneAndUpdate({ _id: id }, { ...body }, { rawResult: true });

const remmoveCommentService = (id) => comment.findByIdAndDelete(id);

const deleteAllCommentsByUserService = (userId) =>
  comment.deleteMany({ user: userId });

module.exports = {
  createCommentService,
  updateCommentService,
  remmoveCommentService,
  deleteAllCommentsByUserService
};
