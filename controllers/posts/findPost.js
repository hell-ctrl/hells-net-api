const { findAllPostsService, findPostByIdService } = require("../../services/postService.js");

const findAllPosts = async (req, res) => {
  let { per_page, page} = req.query;

  per_page? "" : per_page = 10;
  page? "" : page = 1;

  try {
    const posts = await findAllPostsService(page, per_page);

    if (posts.length == 0) {
      return res.status(400).json({ erro: "nenhum post foi criado" });
    }

    res.status(200).json({
      page,
      per_page,
      results: posts.map(post => ({
        id: post._id,
        image: post.content.image,
        text: post.content.text,
        likes: post.likes,
        deslikes: post.deslikes,
        createAt: post.createAt,
        user: post.user.username,
        avatar: post.user.avatar
      }))
    });
  } catch {
    res.status(500).json({ erro: "ocorreu um erro" });
  }
};

const findPost = async (req, res) => {
  const post = req.params.id;

  const postFromDB = await findPostByIdService(post);
  try {
    res.status(200).json({
      id: postFromDB.id,
      image: postFromDB.content.image,
      text: postFromDB.content.text,
      likes: postFromDB.likes,
      deslikes: postFromDB.deslikes,
      comments: postFromDB.comments.map(comment => ({
        id: comment._id,
        comment: comment.comment,
        user: comment.user.username,
        userId: comment.user._id,
        avatar: comment.user.avatar,
        createAt: comment.createAt
      })),
      data: postFromDB.data,
      user: postFromDB.user.username,
      avatar: postFromDB.user.avatar
    });
  } catch {
    return res.status(404).json({ erro: "post não encontrado"});
  }
};

module.exports = { findAllPosts, findPost };
