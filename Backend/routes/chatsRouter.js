const express = require("express");
const { verifyToken } = require("../utils/tokenManager.js");
const { chatCompletionValidator, validate } = require("../utils/validators.js");
const {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} = require("../controllers/chatController.js");

//Protected API
const chatRoutes = express.Router();
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);

module.exports = chatRoutes;
