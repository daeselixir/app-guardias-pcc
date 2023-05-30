const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
    nameArea: {
      type: String,
      required: [true, "Ingresar nombre area"],
      trim: true,
      minlength: [5, "Minimo 5 caracteres"],
      unique: true,
    },
    observationArea: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Ingrese Id usuario creador"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Area", areaSchema);
