const User = require("../models/User");

const getAllUsers = async function (req, res) {
  const users = await User.find({}, "-password");

  if (!users || users.length === 0) {
    res.status(404).json({
      msg: "Users not found",
    });
  }

  res.status(200).json({ users });
};

const getById = async (req, res, next) => {
  const user = await User.findById({ _id: req.params.id }).select("-password");

  try {
    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllUsers,
  getById,
};
