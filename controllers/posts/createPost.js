const { createPostService } = require("../../services/postService.js");

const createPost = async (req, res) => {
  const { text, image } = req.body;

  if (!text && !image) {
    return res.status(400).json({ erro: "envie algum texto ou imagem" });
  }

  try {
    await createPostService({
      user: req.user.id,
      content: {
        image,
        text
      },
      comments: [],
      likes: [],
      deslikes: []
    });

    res.status(200).json({ sucess: "post criado com sucesso" });
  } catch {
    return res.status(500).json({ erro: "ocorreu um erro ao criar o post"});
  }
};


module.exports = createPost;