const Post = require("../../models/Post.js");
const { deletePostService } = require("../../services/postService.js");

const deletePost = async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(400).json({ erro: "envie o id do post" });
  }

  try {
    const postFromDB = await Post.findById(postId);

    if (String(postFromDB.user) === req.user.id) {
      await deletePostService(postId);
      return res.status(200).json({ success: "post deletado com sucesso" });
    }
    res.status(400).json({ erro: "você não pode excluir esse post porquê ele não é seu" });
  } catch {
    res.status(404).json({ erro: "post não existe" });
  }
};

module.exports = deletePost;
