const Company = require("../models/Company");
const ErrorResponse = require("../errors/errorResponse");
const jwt = require("jsonwebtoken");

const getAllcompany = async (req, res) => {
  const company = await Company.find({}, "-_id");

  if (company.length === 0) {
    throw new ErrorResponse("No existen company");
  }

  res.status(200).json({ company });
};

const getCompanybyID = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  const company = await Company.findById({ _id: id });

  if (!company) {
    throw new ErrorResponse("No existe company");
  }

  res.json({ msg: company });
};

const createCompany = async (req, res) => {
  const { rut, nameCompany, address } = req.body;
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const { userID } = decodedToken;

  if (!userID) {
    throw new ErrorResponse("User ID no found");
  }

  const companyExists = await Company.findOne({ rut })

  if (companyExists) {
    throw new ErrorResponse("Empresa ya existe",401)
  }

  const newCompany = await Company.create({
    rut: rut,
    nameCompany: nameCompany,
    address: address,
    createdBy: userID,
  });

  res.status(201).json({ newCompany });
};

const deleteCompany = async (req, res) => {
  const { id } = req.params;

  const deleted = await Company.findByIdAndDelete({ _id: id });

  if (!deleted) {
    throw new ErrorResponse("Company ID no found");
  }

  res.status(204).json({});
};

const updateCompany = async (req, res) => {
  const { id } = req.params;

  const updateCompany = await Company.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ updateCompany });
};

module.exports = {
  getCompanybyID,
  createCompany,
  getAllcompany,
  deleteCompany,
  updateCompany,
};
