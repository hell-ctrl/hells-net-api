const post = require("../models/Post.js");
const comment = require("../models/Comment.js");


const createPostService = (body) => post.create(body);


const findAllPostsService = (page, perPage) =>
  post
    .find()
    .sort({ _id: -1 })
    .skip(page - 1)
    .limit(perPage)
    .populate("user");


const findPostByIdService = async (id) => {
  try {
    const postFromDB = await post.findById({ _id: id }).populate("user");
    const commentsFromDB = await comment
      .find({ postId: postFromDB._id })
      .sort({ _id: -1 })
      .populate("user");

    postFromDB.comments = commentsFromDB;
    return postFromDB;
  } catch {}
};


const findByTextService = (text) =>
  post.find({
    "content.text": { $regex: new RegExp(text, "i") },
  });


const findPostsByUser = (userId) =>
  post.find({ user: userId }).sort({ _id: -1 }).populate("user");


const updatePostService = (postId, body) =>
  post.findOneAndUpdate({ _id: postId }, { ...body }, { rawResult: true });


const deletePostService = (postId) => post.findByIdAndDelete(postId);


const likeService = (postId, userId) =>
  post.findOneAndUpdate(
    {
      _id: postId,
      "likes.userId": { $nin: [userId] },
    },
    { $push: { likes: { userId, createAt: new Date() } } }
    );
    

const deleteLikeService = (postId, userId) =>
  post.findOneAndUpdate({ _id: postId }, { $pull: { likes: { userId } } });


const deslikeService = (postId, userId) =>
  post.findOneAndUpdate(
    {
      _id: postId,
      "deslikes.userId": { $nin: [userId] },
    },
    { $push: { deslikes: { userId, createAt: new Date() } } }
  );


const deleteDeslikeService = (postId, userId) =>
  post.findOneAndUpdate({ _id: postId }, { $pull: { deslikes: { userId } } });


const deleteAllPostsByUserService = (userId) =>
  post.deleteMany({ user: userId });


const deleteAllLikesByUserService = (userId) =>
  post.updateMany({ "likes.userId": userId }, { $pull: { likes: { userId } } });


const deleteAllDeslikesByUserService = (userId) =>
  post.updateMany({ "deslikes.userId": userId }, { $pull: { deslikes: { userId } } });


module.exports = {
  createPostService,
  updatePostService,
  deletePostService,
  findAllPostsService,
  findPostByIdService,
  findByTextService,
  findPostsByUser,
  likeService,
  deleteLikeService,
  deslikeService,
  deleteDeslikeService,
  deleteAllPostsByUserService,
  deleteAllLikesByUserService,
  deleteAllDeslikesByUserService
};
