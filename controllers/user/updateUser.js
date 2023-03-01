const bcrypt = require("bcrypt");
const User = require("../../models/User.js");
const { updateUserService } = require("../../services/userService.js");

const updateUser = async (req, res) => {
  var { username, avatar, password, new_password } = req.body;

  if (!username && !avatar && !new_password) {
    return res.status(400).json({ erro: "envie pelo menos um campo" });
  };

  try {
    if (new_password && password) {
      const userFromDB = await User.findById(req.user.id).select("+password");
      let isMatch = bcrypt.compareSync(password, userFromDB.password);

      if(!isMatch) return res.status(400).json({erro: "senha incorreta"})
  
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(new_password, salt);
    };
    if (username) {
      const userFromDB = await User.findOne({ username: username });
      if(userFromDB) return res.status(400).json({erro: "esse usuário já existe"}) 
    };

    const body = {
      username,
      avatar,
      password,
    };

    await updateUserService(req.user.id, body);

    res.status(200).json({ success: "informações atualizadas" });
  } catch {
    res.status(500).json({ erro: "ocorreu um erro" });
  };
};

module.exports = updateUser;
