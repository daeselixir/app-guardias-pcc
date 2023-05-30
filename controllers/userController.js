const User = require("../models/User");
const ErrorResponse = require("../errors/errorResponse");

const getAllUsers = async function (req, res) {
  const users = await User.find({}, "-password");
  // console.log(req.headers.authorization)
  if (!users || users.length === 0) {
    res.status(404).json({
      msg: "Users not found",
    });
  }

  res.status(200).json({ users });
};


// TODO : Revisar si es necesario el try catch
const getById = async (req, res, next) => {
  const user = await User.findById({ _id: req.params.id }).select("firstName lastName email createdAt");

  try {
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res) => {
  const {
    body,
    params: { id: id },
  } = req;

  const user = await User.findByIdAndUpdate({ _id: id }, body, {
    new: true,
    runValidators: true,
  }).select("firstName lastName email createdAt");

  if (!user) {
    throw new ErrorResponse(`No user with id ${id}`);
  }

  res.status(201).json({ user });
};

const deleteById = async (req, res) => {
  const user = await User.findByIdAndRemove({ _id: req.params.id });

  if (!user) throw new ErrorResponse("User not found");

  res.status(201).json({});
};

module.exports = {
  getAllUsers,
  getById,
  deleteById,
  updateById,
};
