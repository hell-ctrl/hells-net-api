const { findAllPostsService, findPostByIdService, findByTextService } = require("../../services/postService.js");

const findAllPosts = async (req, res) => {
  let { per_page, page} = req.query;

  per_page? "" : per_page = 10;
  page? "" : page = 1;

  try {
    const posts = await findAllPostsService(page, per_page);

    if (posts.length == 0) {
      return res.status(400).json({ message: "nenhum post foi criado" });
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
        userId: post.user._id,
        user: post.user.username,
        avatar: post.user.avatar
      }))
    });
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
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
      createAt: postFromDB.createAt,
      user: postFromDB.user.username,
      userId: postFromDB.user._id,
      avatar: postFromDB.user.avatar
    });
  } catch {
    return res.status(404).json({ message: "post não encontrado"});
  }
};


const findPostsByText = async (req, res) => {
  const { query } = req.query;

  try {
    const result = await findByTextService(query);

    if (result.length == 0 || query.length == 0) {
      return res.status(404).json({ message: "nenhum post foi encontrado" });
    }

    res.status(200).json({
      result: result.map(post => ({
        id: post.id,
        image: post.content.image,
        text: post.content.text,
        likes: post.likes,
        deslikes: post.deslikes,
        createAt: post.createAt,
        user: post.user.username,
        userId: post.user._id,
        avatar: post.user.avatar

      }))
    });
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
  }
};


module.exports = { findAllPosts, findPost, findPostsByText };
