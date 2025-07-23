const User = require("../models/User.js");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateChatCompletion = async (req, res, next) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const message = req.body.message;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }

    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL_NAME,
    });
    const prompt =
      "";
    const result = await model.generateContent(prompt + message);
    const response = await result.response;
    const completeion = response.text();

    const chats = user.chats.map(({ query, response, id }) => ({
      query,
      response,
      id,
    }));

    chats.push({ query: message, response: completeion, id: new Date() });
    user.chats.push({ query: message, response: completeion, id: new Date() });
    // console.log(user.chats);

    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const sendChatsToUser = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    // console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

const deleteChats = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    // console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

module.exports = {
  generateChatCompletion,
  sendChatsToUser,
  deleteChats,
};
