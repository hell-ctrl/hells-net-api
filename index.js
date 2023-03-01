const express = require("express");
const connectDB = require("./configs/mongodb.js");
const limiter = require("./middlewares/requestsLimit.js");

const authRouter = require("./routers/authRouters.js");
const userRouter = require("./routers/userRouters.js");
const postsRouter = require("./routers/postsRouters.js");


const app = express();
connectDB();

app.use(limiter)
app.use(express.json());

app.use(authRouter);
app.use("/users", userRouter);
app.use("/posts", postsRouter);

app.listen(3000, () => {
  console.log("servidor rodando");
});
