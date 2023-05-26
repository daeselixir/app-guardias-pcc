const User = require("../models/User");
const ErrorResponse = require("../errors/errorResponse");
const jwt = require("jsonwebtoken");
const { emailRegister } = require("../utils/email");

//Create account
const register = async (req, res, next) => {
  // console.log(newToken);

  try {
    const user = new User(req.body);
    const token = await user.createJWT();

    user.token = token;
    await user.save();
    emailRegister({
      email: user.email,
      firstName: user.firstName,
      token: token,
    });

    res.status(201).json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

//Sign in account
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorResponse("Passwords do not match o email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorResponse("Email is not available");
  }

  const isPassword = await user.comparePassword(password);
  // console.log(isPassword);

  if (!isPassword) {
    throw new ErrorResponse("Password incorrect!");
  }

  const token = user.createJWT();

  res.cookie("t", token, {
    expire: new Date() + 9999,
  });

  res.status(201).json({ user: user.firstName, token: token });
};

//confirm account
const confirmAccount = async (req, res, next) => {
  const { token } = req.params;

  const userConfirm = await User.findOne({ token });

  if (!userConfirm) {
    throw new ErrorResponse("Falta token!");
  }

  const { email } = userConfirm;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorResponse("User not found!");
  }

  try {
    userConfirm.confirmed = true;
    userConfirm.token = "";

    await userConfirm.save();
  } catch (error) {
    next(error);
  }

  res.json({ msg: "Account confirmed" });
};

const forgotPassword = async (req, res) => {
  res.send("send");
};

//Validacion de Token
const requireToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ErrorResponse("Falta token de autorizacion");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    next();
  } catch (error) {
    next(error);
  }
};

//Cierre session
const signout = (req, res) => {
  console.log(res);
  res.clearCookie("t");
  res.json({
    message: "Signout success",
  });
};

module.exports = {
  register,
  login,
  requireToken,
  signout,
  forgotPassword,
  confirmAccount,
};
