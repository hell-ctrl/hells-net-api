const User = require("../models/User.js");
const Follower = require("../models/Follower.js");

const signinService = (user) =>
  User.findOne({
    $or: [{ email: user }, { username: user }],
  }).select("+password");

const createUserService = (body) => User.create(body);

const findUserByNameService = async (name) => {
  const userFromDB = await User.findOne({ username: { $eq: name } });

  userFromDB.following = await Follower.find({ user: userFromDB._id })
    .populate("following")

  userFromDB.followers = await Follower.find({ following: userFromDB._id })
    .populate("user")

  return userFromDB;
};

const findByTextService = (text) =>
  User.find({
    username: { $regex: new RegExp(text, "i") },
  }).sort({ _id: -1 });

const findAllUsersService = (perPage, page) =>
  User.find()
    .sort({ _id: -1 })
    .skip(page - 1)
    .limit(perPage)
    .select("-posts -following -followers");

const updateUserService = (userId, body) =>
  User.findOneAndUpdate({ _id: userId }, { ...body }, { rawResult: true });

const deleteUserService = (userId) => User.findByIdAndDelete(userId);

const followUserService = async (userId, following) => {
  const isFollowing = await Follower.find({
    user: userId,
    following: following,
  });
  if (isFollowing.length == 0) {
    return await Follower.create({
      user: userId,
      following: following,
    });
  }
};

const unFollowUserService = async (userId, following) => {
  const isFollowing = await Follower.find({
    user: userId,
    following: following,
  });
  if (isFollowing.length == 1) {
    return await Follower.findOneAndDelete({
      user: userId,
      following: following,
    });
  }
};

module.exports = {
  signinService,
  createUserService,
  updateUserService,
  deleteUserService,
  findUserByNameService,
  findAllUsersService,
  findByTextService,
  followUserService,
  unFollowUserService,
};
