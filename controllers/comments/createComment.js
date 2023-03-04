const { createCommentService } = require("../../services/commentService.js");
const Post = require("../../models/Post.js");

const createComment = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  if (!comment) {
    return res.status(400).json({ message: "envie o comentário" });
  }
  if (!id) {
    return res.status(400).json({ message: "em qual post você quer comentar?" });
  }
  try {
    const postFromDB = await Post.findById(id);
    if(!postFromDB) return res.status(404).json({message: "este post não existe"})

    await createCommentService({
      user: req.user.id,
      postId: id,
      comment,
    });
    res.status(200).json({ message: "comentário criado" });
  } catch {
    res.status(500).json({ message: "ocorreu um erro ao comentar"});
  }
};

module.exports = createComment;
