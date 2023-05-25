const User = require("../models/User");
const ErrorResponse = require("../errors/errorResponse");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const user = await User.create(req.body);
  const token = await user.createJWT();

  try {
    res.status(201).json({
      success: true,
      user: { firstName: user.firstName, lastName: user.email },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorResponse("Passwords do not match o email");
  }

  const user = await User.findOne({ email });
  console.log(user);
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

const signout = (req, res) => {
  console.log(res)
  res.clearCookie("t");
  res.json({
    message: "Signout success",
  });
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




module.exports = {
  register,
  login,
  requireToken,
  signout
};
