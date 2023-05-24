const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  nameCompany: {
    type: String,
    required: [true, "Provide name company"],
    trim: true,
    minlength: [5,"Please the minimum length is 5 characters"],
    unique: true,
  },
});

module.exports = mongoose.model("Company", companySchema);
