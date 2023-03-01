const Post = require("../../models/Post.js");
const { updatePostService } = require("../../services/postService.js");
const { existsOrError } = require("../validation.js");


const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { image, text } = req.body;

  if (!image && !text) {
    return res.status(400).json({ erro: "envie pelo menos um campo" });
  }

  try {
    const postFromDB = await Post.findById(postId);
    existsOrError(postFromDB, "esse post não existe");

    if (String(postFromDB.user) == req.user.id) {
      await updatePostService(postId, {
        content: {
          image,
          text,
        },
      });
      return res.status(200).json({ success: "post atualizado com sucesso" });
    }
    res.status(400).json({ erro: "você não pode atualizar esse post" });
  } catch {
    res.status(404).json({ erro: "esse post não existe" });
  }
};

module.exports = updatePost;
