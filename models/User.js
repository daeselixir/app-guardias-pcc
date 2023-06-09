const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Ingresar nombre"],
      minlength: 4,
      maxlength: 25,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Ingresar apellido"],
      minlength: 4,
      maxlength: 25,
      trim: true,
    },
    companyID: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: [true, "Ingresar empresa"],
    },
    email: {
      type: String,
      required: [true, "Ingresar correo"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Ingresar correo valido",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Ingresar clave"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    token: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hashear Password

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; //si se ha modificado convierte a true y retorna

  const salt = await bcryptjs.genSalt(10);
  // console.log(salt);
  this.password = await bcryptjs.hash(this.password, salt);
});

//Validar Password
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
};

//Crear Token
userSchema.methods.createJWT = function () {
  return jwt.sign({ userID: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

module.exports = mongoose.model("User", userSchema);
