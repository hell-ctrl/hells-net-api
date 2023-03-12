const { findPostsByUser } = require("../../services/postService.js");
const {
  findUserByNameService,
  findAllUsersService,
  findByTextService,
} = require("../../services/userService.js");

const findAllUsers = async (req, res) => {
  let { per_page, page } = req.query;

  per_page ? "" : (per_page = 20);
  page ? "" : (page = 1);

  try {
    const users = await findAllUsersService(per_page, page);
    res.status(200).json({
      page,
      per_page,
      result: users,
    });
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
  }
};

const findUser = async (req, res) => {
  const { user } = req.params;

  try {
    const userFromDB = await findUserByNameService(user);
    const postsByUser = await findPostsByUser(userFromDB._id);
    userFromDB.posts = postsByUser;
    res.status(200).json({
      id: userFromDB._id,
      user: userFromDB.username,
      avatar: userFromDB.avatar,
      background: userFromDB.background,
      followers: userFromDB.followers.map((user) =>({
        id: user.user._id,
        user: user.user.username,
        avatar: user.user.avatar
      })),
      following: userFromDB.following.map((user) =>({
        id: user.following._id,
        user: user.following.username,
        avatar: user.following.avatar
      })),
      posts: userFromDB.posts.map((post) => ({
        id: post._id,
        image: post.content.image,
        text: post.content.text,
        likes: post.likes,
        deslikes: post.deslikes,
        createAt: post.createAt,
      })),
    });
  } catch {
    return res.status(404).json({ message: "usuário não encontrado" });
  }
};

const findUsersByText = async (req, res) => {
  const { query } = req.query;

  try {
    const result = await findByTextService(query);

    if (result.length == 0 || query.length == 0) {
      return res.status(404).json({ message: "nenhum usuário foi encontrado" });
    }

    res.status(200).json(result);
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
  }
};

module.exports = { findUser, findAllUsers, findUsersByText };
