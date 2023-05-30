const Incident = require("../models/Incident");
const ErrorResponse = require("../errors/errorResponse");

const getByID = async (req, res) => {
  res.send("incident");
};

const getAllIncident = async (req, res) => {
  res.send("incident");
};

const createIncident = async (req, res) => {
  res.send("incident");
};

const updateIncident = async (req, res) => {
  res.send("incident");
};

const deleteIncident = async (req, res) => {
  res.send("incident");
};

module.exports = {
  getByID,
  getAllIncident,
  createIncident,
  updateIncident,
  deleteIncident,
};
