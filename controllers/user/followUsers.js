const {
  followUserService,
  unFollowUserService
} = require("../../services/userService");

const followUser = async (req, res) => {
  const userId = req.user.id; //seu id
  const following = req.params.id; //id do usuário que deseja seguir

  try {
    if (userId == following) {
      return res.status(400).json({ message: "você não pode se seguir" });
    }

    const follow = await followUserService(userId, following);

    if (!follow) {
      return res.status(400).json({ message: "você já sague esse usuário" });
    }

    res.status(200).json({ message: "você seguiu esse usuário com sucesso" });
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
  }
};

const unFollowUser = async (req, res) => {
  const userId = req.user.id; //seu id
  const following = req.params.id; //id do usuário que deseja seguir

  try {
    await unFollowUserService(userId, following);
    res
      .status(200)
      .json({ message: "você deixou de seguir esse usuário com sucesso" });
  } catch {
    res.status(500).json({ message: "ocorreu um erro" });
  }
};

module.exports = { followUser, unFollowUser };
