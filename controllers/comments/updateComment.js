const Comment = require("../../models/Comment.js");
const { update } = require("../../services/commentService.js");

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (!id || !comment) {
    return res.status(400).json({ erro: "envie todos os parâmetros" });
  }

  try {
    const commentFromDB = await Comment.findById(id);
    if (req.user.id == String(commentFromDB.user)) {
      await update(id, {
        comment,
      });
      return res.status(200).json({ success: "comentário atualizado" });
    }
    return res.status(400).json({
      erro: "você não pode atualizar esse comentário porquê ele não é seu",
    });
  } catch {
    res.status(500).json({ erro: "ocorreu um erro" });
  };
};


module.exports = updatePost;