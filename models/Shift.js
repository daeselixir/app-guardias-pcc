const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
    nameShift: {
      type: String,
      required: [true, "Provide name area"],
      trim: true,
      minlength: [5, "Minimo caracteres son 5"],
      unique: true,
    },
    shiftStartTime: {
      type : Date,
    },
    shiftEndTime: {
      type : Date,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Falta id del usuario creador"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Shift", shiftSchema);
