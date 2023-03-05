const { savePostService, findSavedPostsService, deleteSavedPostService } = require("../../services/postService.js");

const savePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    if (!id || !userId) {
      return res.status(400).json({ message: "envie todos os parmâmetros" });
    }

    const savedPosts = await savePostService(id, userId);
    if (!savedPosts) {
      return res.status(400).json({ message: "já salvo" });
    }

    res.status(200).json({ message: "post salvo" });
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
  }
};

const findSavedPosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const posts = await findSavedPostsService(userId);
    res.status(200).json({
      result: posts.map((post) => ({
        post_id: post.post._id,
        image: post.post.content.image,
        text: post.post.content.text,
        createAt: post.post.createAt,
        user: post.user.username,
        avatar: post.user.avatar,
      }))
    });
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
  }
};

const deleteSavedPost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await deleteSavedPostService(id, userId);
    res.status(200).json({message: "post deletado dos salvos"});
  } catch {
    res.status(500).json({message: "ocorreu um erro"})
  }
}

module.exports = { savePost, findSavedPosts, deleteSavedPost };
