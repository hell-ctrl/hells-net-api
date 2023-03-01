const user = require("../models/User.js");

const createUserService = (body) => user.create(body);


const findUserByNameService = (name) => user.findOne({ username: name });


const findByTextService = (text) =>
  user.find({
    username: { $regex: new RegExp(text, "i") },
  });


const findAllUsersService = (perPage, page) => user.find().sort({ _id: -1 }).skip(page - 1).limit(perPage).select("-posts");


const updateUserService = (id, body) =>
  user.findOneAndUpdate({ _id: id }, { ...body }, { rawResult: true });
  

const deleteUserService = (id) => user.findByIdAndDelete(id);

module.exports = {
  createUserService,
  updateUserService,
  deleteUserService,
  findUserByNameService,
  findAllUsersService,
  findByTextService,
};
