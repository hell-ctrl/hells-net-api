const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);

const user = process.env.USER_NAME;
const psw = process.env.USER_PASSWORD;

const connectDB = () => {
  mongoose
    .connect(
      `mongodb+srv://${user}:${psw}@cluster0.jtowbcx.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("conectado ao mongodb"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
