const User = require("../models/User");
const StatusCodes = require("http-status-codes");

const register = async (req, res) => {
  console.log(req.body);

  const user = await User.create(req.body);

  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  register,
};
