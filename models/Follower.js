const mongoose = require("mongoose");

const FollowerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const follower = mongoose.model("follower", FollowerSchema);

module.exports = follower;
