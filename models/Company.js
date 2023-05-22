const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  nameCompany: {
    type: String,
    required: [true, "Provide name company"],
    trim: true,
    minlength: 6,
    unique: true,
  },
});

module.exports = mongoose.model("Company", companySchema);
