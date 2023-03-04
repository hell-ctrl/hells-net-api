const Comment = require("../../models/Comment.js");
const { remove } = require("../../services/commentService.js");

const deleteComment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "informe o id do comentário" });
  }

  try {
    const commentFromDB = await Comment.findById(id);

    if (String(commentFromDB.user) == req.user.id) {
      await remove(id);
      return res.status(200).json({ message: "comentário apagado" });
    }
    res.status(400).json({
        message: "você não pode apagar esse comentário porquê ele não é seu"
      });
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
  };
};

module.exports = deleteComment;