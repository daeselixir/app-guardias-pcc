const Area = require("../models/Area");
const ErrorResponse = require("../errors/errorResponse");
const jwt = require("jsonwebtoken");

const getByID = async (req, res) => {
  const { id } = req.params;

  const area = await Area.findById(id);

  res.json({ area });
};

const getAllArea = async (req, res) => {
  res.send("get by id");
};

const createArea = async (req, res) => {
  const authHeader = req.headers.authorization;
  const { company, nameArea, observationArea } = req.body;

  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const { userID } = decodedToken;

  if (!userID) {
    throw new ErrorResponse("Usuario no valido", 403);
  }

  if (!token) {
    throw new ErrorResponse("Invalid token", 401);
  }

  if (!company || !nameArea || !observationArea) {
    throw new ErrorResponse("Ingrese los campos faltantes", 403);
  }

  const findNameArea = await Area.findOne({ nameArea: nameArea });
  if (findNameArea) {
    throw new ErrorResponse("Area ya existe", 403);
  }

  const newArea = await Area.create({
    company,
    nameArea,
    observationArea,
    createdBy: userID,
  });

  res.status(201).json(newArea);
};

const updateArea = async (req, res) => {
  res.send("get by id");
};

const deleteArea = async (req, res) => {
  res.send("get by id");
};

module.exports = {
  getByID,
  getAllArea,
  createArea,
  updateArea,
  deleteArea,
};
