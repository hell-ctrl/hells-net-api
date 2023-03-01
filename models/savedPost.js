const mongoose = require("mongoose");

const savedPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const savedPost = mongoose.model("savedPost", savedPostSchema);

module.exports = savedPost;
