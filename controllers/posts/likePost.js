const {
  likeService,
  deleteLikeService,
  deslikeService,
  deleteDeslikeService,
} = require("../../services/postService.js");

const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const postLiked = await likeService(id, req.user.id);

    if (!postLiked) {
      await deleteLikeService(id, req.user.id);
      return res.status(200).json({ success: "like removido com sucesso" });
    }

    await deleteDeslikeService(id, req.user.id);
    res.status(200).json({ success: "like adicionado com sucesso" });
  } catch {
    res.status(500).json({ erro: "ocorreu um erro" });
  }
};

const deslikePost = async (req, res) => {
  const { id } = req.params;

  try {
    const postDesliked = await deslikeService(id, req.user.id);

    if (!postDesliked) {
      await deleteDeslikeService(id, req.user.id);
      return res.status(200).json({ success: "deslike removido com sucesso" });
    }
    
    await deleteLikeService(id, req.user.id);
    res.status(200).json({ success: "deslike adicionado com sucesso" });
  } catch {
    res.status(500).json({ erro: "ocorreu um erro" });
  }
};

module.exports = { likePost, deslikePost };
