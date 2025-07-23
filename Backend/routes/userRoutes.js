const {
  getAllUsers,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} = require("../controllers/userController");

const { verifyToken } = require("../utils/tokenManager");

const {
  loginValidator,
  signupValidator,
  validate,
} = require("../utils/validators");

const userRoutes = require("express").Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);

module.exports = userRoutes;
