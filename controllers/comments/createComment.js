const { createCommentService } = require("../../services/commentService.js");
const Post = require("../../models/Post.js");

const createComment = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  if (!comment) {
    return res.status(400).json({ erro: "envie o comentário" });
  }
  if (!id) {
    return res.status(400).json({ erro: "em qual post você quer comentar?" });
  }
  try {
    const postFromDB = await Post.findById(id);
    if(!postFromDB) return res.status(404).json({erro: "este post não existe"})

    await createCommentService({
      user: req.user.id,
      postId: id,
      comment,
    });
    res.status(200).json({ success: "comentário criado" });
  } catch(e) {
    res.status(500).json({ erro: "ocorreu um erro ao comentar"});
    console.log(e)
  }
};

module.exports = createComment;
