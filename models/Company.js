const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    rut: {
      type: String,
      required: [true, "Ingrese rut,con guion y sin puntos"],
      minlength: 10,
      maxlength: [10,"Excede el maximo de caracteres permitido"],
      unique: [true],
    },
    nameCompany: {
      type: String,
      required: [true, "Ingrese nombre empresa"],
      trim: true,
      minlength: [5, "Excede el maximo de caracteres permitido"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Ingrese direccion"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Plase provided id"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);
