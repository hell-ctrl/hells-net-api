const bcrypt = require("bcrypt");
const { generateToken } = require("./generateToken.js");
const { existsOrError } = require("../validation.js");
const { signinService } = require("../../services/userService.js");

const signin = async (req, res) => {
  const { user, password } = req.body;

  try {
    if (!user || !password) {
      throw "preencha todos os campos";
    }

    var userFromDB = await signinService(user);


    existsOrError(userFromDB, "usuário e/ou senha incorretos");
  } catch (err) {
    return res.status(400).json({ message: err });
  }

  const isMatch = bcrypt.compareSync(password, userFromDB.password);
  if (!isMatch) {
    return res.status(401).json({ message: "usuário e/ou senha inválidos" });
  }

  const tokens = generateToken({ id: userFromDB._id, adm: userFromDB.adm });

  res.status(200).json({
    message: "login feito com sucesso",
    token: tokens.token,
    refresh_token: tokens.refresh_token,
  });
};

module.exports = signin;
