const Company = require("../models/Company");

const createCompany = async (req, res) => {
  const newCompany = await Company.create(req.body);

  res.status(201).json({ newCompany });
};

module.exports = {
    createCompany
};
