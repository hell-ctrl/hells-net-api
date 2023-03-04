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
      return res.status(200).json({ message: "like removido com sucesso" });
    }

    await deleteDeslikeService(id, req.user.id);
    res.status(200).json({ message: "like adicionado com sucesso" });
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
  }
};

const deslikePost = async (req, res) => {
  const { id } = req.params;

  try {
    const postDesliked = await deslikeService(id, req.user.id);

    if (!postDesliked) {
      await deleteDeslikeService(id, req.user.id);
      return res.status(200).json({ message: "deslike removido com sucesso" });
    }
    
    await deleteLikeService(id, req.user.id);
    res.status(200).json({ message: "deslike adicionado com sucesso" });
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
  }
};

module.exports = { likePost, deslikePost };
