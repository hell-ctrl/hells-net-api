const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
  },
  background: {
    type: String,
  },
  posts: {
    type: Array,
    required: true
  },
  biography: {
    type: String
  },
  followers: {
    type: Array,
    required: true,
  },
  following: {
    type: Array,
    required: true,
  },
  adm: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
