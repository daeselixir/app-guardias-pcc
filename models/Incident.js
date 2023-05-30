const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    createBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      trim: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    shift: {
      type: mongoose.Types.ObjectId, 
      ref: "Shift",
      required: true,
    },
    area: {
      type: mongoose.Types.ObjectId,
      ref: "Area",
      required: true,
    },
    dateRegistration: {
      type: Date,
      required: true,
    },
    stateCheck: {
      type: Boolean,
    },
    observationCheck: {
      type: Boolean,
    },
    observation: {
      type: String,
    },
  },
  { timestamps: true }
);

exports.module = mongoose.model("Incident", incidentSchema);
