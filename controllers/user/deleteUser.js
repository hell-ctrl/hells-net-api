const {
  deleteAllPostsByUserService,
  deleteAllLikesByUserService,
  deleteAllDeslikesByUserService,
  deleteAllSavedPostsByUserService,
} = require("../../services/postService.js");
const bcrypt = require("bcrypt");
const User = require("../../models/User.js");
const { deleteUserService } = require("../../services/userService.js");
const { deleteAllCommentsByUserService } = require("../../services/commentService.js");

const deleteUser = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id;

  try {
    const userFromDB = await User.findById(userId).select("+password");
    const isMatch = bcrypt.compareSync(password, userFromDB.password);

    if (isMatch) {
      await deleteUserService(userId);
      await deleteAllPostsByUserService(userId);
      await deleteAllDeslikesByUserService(userId);
      await deleteAllLikesByUserService(userId);
      await deleteAllCommentsByUserService(userId);
      await deleteAllSavedPostsByUserService(userId);
      res.status(200).json({ sucess: "usuário excluído" });
    }
    res.status(400).json({ message: "senha inválida" });
  } catch {
    return res.status(500).json({ message: "ocorreu um erro ao deletar usuário" });
  }
};

module.exports = deleteUser;
