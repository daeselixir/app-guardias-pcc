const mongoose = require("mongoose");
const bryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 4,
    maxlength: 25,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 4,
    maxlength: 25,
    trim: true,
  },
  companyID: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
    required: [true, "Please provide a company name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

// Hashear Password


//Validar Password
//Crear Token

module.exports = mongoose.model("User", userSchema);
