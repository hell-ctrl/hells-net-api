const bcrypt = require("bcrypt");
const User = require("../../models/User.js");
const generateToken = require("./generateToken.js");
const { existsOrError } = require("../validation.js");

const signin = async (req, res) => {
  const { user, password } = req.body;

  try {
    if (!user || !password) {
      throw "preencha todos os campos";
    }

    var userFromDB = await User.findOne({
      $or: [{ email: user }, { username: user }],
    }).select("+password");

    existsOrError(userFromDB, "usuário e/ou senha incorretos");
  } catch (err) {
    return res.status(400).json({ erro: err });
  }

  const isMatch = bcrypt.compareSync(password, userFromDB.password);
  if (!isMatch) {
    return res.status(401).json({ erro: "usuário e/ou senha inválidos" });
  }

  const tokens = generateToken({ id: userFromDB._id, adm: userFromDB.adm });

  res.status(200).json({
    success: "login feito com sucesso",
    token: tokens.token,
    refresh_token: tokens.refreshToken,
  });
};

module.exports = signin;
