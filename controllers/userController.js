const User = require("../models/User");

const getAllUsers = async function (req, res) {
  const users = await User.find({}, "-password");

  if (!users) {
    res.status(404).json({
      msg: "Users not found",
    });
  }

  res.status(200).json({ users });
};

const getById = async (req, res, next) => {

  const user = await User.findOne({ _id: req.params.id }).select("-password");
  // console.log(user)

  if (!user) {
    throw new Error(`No user with ud : ${req.params.id}`);
  }

  try {
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getById,
};
