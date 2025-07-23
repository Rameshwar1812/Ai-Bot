const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: new Date().toISOString,
  },
  query: {
    type: String,
    required: [true, "Role is required"],
  },
  response: {
    type: String,
    required: [true, "Content is required"],
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profilePic: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-profile-user-icon.png",
  },
  chats: [ChatSchema],
});

module.exports = mongoose.model("User", UserSchema);
