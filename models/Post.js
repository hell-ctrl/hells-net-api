const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  comments: {
    type: Array,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
  deslikes: {
    type: Array,
    required: true,
  },
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
