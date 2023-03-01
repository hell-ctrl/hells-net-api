const Comment = require("../../models/Comment.js");
const { remove } = require("../../services/commentService.js");

const deleteComment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ erro: "informe o id do comentário" });
  }

  try {
    const commentFromDB = await Comment.findById(id);

    if (String(commentFromDB.user) == req.user.id) {
      await remove(id);
      return res.status(200).json({ success: "comentário apagado" });
    }
    res.status(400).json({
        erro: "você não pode apagar esse comentário porquê ele não é seu"
      });
  } catch {
    res.status(500).json({ erro: "ocorreu um erro" });
  };
};

module.exports = deleteComment;