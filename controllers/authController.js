const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const ErrorResponse = require("../errors/errorResponse");

const register = async (req, res, next) => {

  const { firstName } = req.body
  console.log(firstName)

  if (firstName === 'hola') {
    return  next(new ErrorResponse('ENo already exists', 400))
  }

  try {
    const user = await User.create(req.body);
    const token = await user.createJWT();
  
    res.status(201).json({ success: true, user, token });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  register,
};
