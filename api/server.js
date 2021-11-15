const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const userRouter = require("./users/userRouter");
const authRouter = require("./auth/auth-router");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", userRouter);

server.use("/api/auth", authRouter);

// eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
