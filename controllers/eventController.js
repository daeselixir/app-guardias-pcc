const Event = require("../models/Event");
const ErrorResponse = require("../errors/errorResponse");
const { reset } = require("nodemon");

const getByID = async (req, res) => {
  res.send("event");
};

const getAllEvent = async (req, res) => {
  res.send("event");
};

const createEvent = async (req, res) => {
  res.send("event");
};

const updateEvent = async (req, res) => {
  res.send("event");
};


const deleteEvent = async (req, res) => {
  res.send("event");
};

module.exports = {
  getByID,
  getAllEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
