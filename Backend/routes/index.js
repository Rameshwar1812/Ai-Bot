const chatRoutes = require('./chatsRouter');
const userRoutes = require('./userRoutes');

const appRouter = require('express').Router();

appRouter.use("/user", userRoutes);     //domain/api/v1/user
appRouter.use("/chat", chatRoutes);    //domain/api/v1/chat

module.exports = appRouter;