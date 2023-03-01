const { findUserByNameService, findAllUsersService } = require("../../services/userService.js");
const { findPostsByUser } = require("../../services/postService.js");

const findAllUsers = async (req, res) => {
  let { per_page, page} = req.query;

  per_page? "" : per_page = 20;
  page? "" : page = 1;

  try {
    const users = await findAllUsersService(per_page, page);
    res.status(200).json({
      page,
      per_page,
      result: users
    });
  } catch {
    res.status(500).json({ erro: "ocorreu um erro" });
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
      followers: userFromDB.followers,
      following: userFromDB.following,
      posts: userFromDB.posts.map(post => ({
        id: post._id,
        image: post.content.image,
        text: post.content.text,
        likes: post.likes,
        deslikes: post.deslikes,
        createAt: post.createAt
      }))
    });
  } catch {
    return res.status(404).json({ erro: "usuário não encontrado" });
  };
};


module.exports = { findUser, findAllUsers };
