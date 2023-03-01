const bcrypt = require("bcrypt");
const User = require("../../models/User.js");
const generateToken = require("./generateToken.js");
const { createUserService } = require("../../services/userService.js");
const { notExistsOrError, equalOrError, existsOrError, validOrError } = require("../validation.js");

const encryptPswd = (password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const signup = async (req, res) => {
  let { username, email, password, confirm_password, adm } = req.body;

  req.originalUrl.startsWith("/users")? adm = true : adm = false;

  try {
    existsOrError(username, "nickname não informado");
    existsOrError(email, "email não informado");
    existsOrError(password, "senha não informada");
    existsOrError(confirm_password, "confirmação de senha não informada");
    validOrError(email, "email inválido");
    equalOrError(password, confirm_password, "as senhas não coincidem");

    const userFromDB = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    notExistsOrError(userFromDB, "nickname e/ou email já cadastrados");
  } catch (err) {
    return res.status(400).json({error: err});
  }

  password = encryptPswd(password);

  createUserService({
    username,
    email,
    password,
    followers: [],
    following: [],
    posts: [],
    adm,
  }).then((data) => {
    let tokens = generateToken({ id: data._id, adm });
    res.status(200).json({
      sucess: "usuário cadastrado com sucesso",
      token: tokens.token,
      refresh_token: tokens.refreshToken,
    });
  }).catch(() => res.status(500).json({error: "ocorreu um erro ao cadastrar um novo usuário"}));
};


module.exports = signup;