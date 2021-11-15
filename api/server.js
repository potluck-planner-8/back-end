const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const userRouter = require("./users/userRouter");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", userRouter);

module.exports = server;
