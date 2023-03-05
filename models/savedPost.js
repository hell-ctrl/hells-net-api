const mongoose = require("mongoose");

const savedPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
});

const savedPost = mongoose.model("savedPost", savedPostSchema);

module.exports = savedPost;
