const User = require("../models/User");
const ErrorResponse = require("../errors/errorResponse");
const jwt = require("jsonwebtoken");
const { emailRegister, resetPassword } = require("../utils/email");
const generateID = require("../utils/genID");

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
    throw new ErrorResponse("Clave o email no son correctos");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorResponse("Correo no es valido");
  }

  if (!user.confirmed) {
    throw new ErrorResponse("No ha confirmado su cuenta");
  }

  const isPassword = await user.comparePassword(password);
  // console.log(isPassword);

  if (!isPassword) {
    throw new ErrorResponse("Clave incorrecta!");
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
    throw new ErrorResponse("Usuario no existe!");
  }

  try {
    userConfirm.confirmed = true;
    userConfirm.token = "";

    await userConfirm.save();
  } catch (error) {
    next(error);
  }

  res.json({ msg: "Cuenta confirmada" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  //Comprobamos si el user existe
  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorResponse("El usuario no existe");
  }

  user.token = generateID();
  await user.save();

  //Enviamos email
  resetPassword({
    email: user.email,
    firstName: user.firstName,
    token: user.token,
  });

  res.json({ msg: "Hemos enviado un email con las instrucciones 😎" });
};

const newPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";

    await user.save();
    res.json({ msg: "Usuario modificado correctamente" });
  } else {
    throw new ErrorResponse("Token invalid");
  }
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

// TODO: Terminar signout

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
  newPassword,
};
