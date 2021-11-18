const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const userRouter = require("./users/userRouter");
const authRouter = require("./auth/auth-router");
const potluckRouter = require("./potlucks/potluck-router");
const inviteRouter = require("./invite/invite-router");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.use("/api/potlucks", potluckRouter);
server.use("/api/invite", inviteRouter);

// eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
