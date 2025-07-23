const User = require("../models/User");
const { hash, compare } = require("bcryptjs");
const { createToken } = require("../utils/tokenManager");
const COOKIE_NAME = require("../utils/constants");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "success",
      users,
    });
  } catch (err) {
    // console.log(err);
    return res.status(404).json({
      message: "fail",
      cause: err.message,
    });
  }
};

const userSignup = async (req, res, next) => {
  ``;
  try {
    const { name, email, password, profilePic } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      profilePic: profilePic,
    });
    await user.save();

    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      path: "/",
    });

    // console.log(`DB : \nUser: ${user}`);

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      expires,
      httpOnly: true,
      signed: true,
      secure: true,
    });

    return res.status(201).json({
      message: "OK",
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

const userLogin = async (req, res, next) => {
  try {
    //user login
    const { email, password } = req.body;
    // console.log(`DB : \nEmail: ${email} \nPassword: ${password}`);
    const user = await User.findOne({ email });
    // console.log(`DB : \nUser: ${user}`);
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    // create token and store cookie

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      expires,
      httpOnly: true,
      signed: true,
      secure: true,
    });

    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    // console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

const verifyUser = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({
        message: "OK",
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      });
  } catch (error) {
    console.log("Verify User: ", error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

const userLogout = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    // console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

module.exports = {
  getAllUsers,
  userSignup,
  userLogin,
  verifyUser,
  userLogout,
};
