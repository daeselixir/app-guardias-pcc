const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    nameEvent: {
      type: String,
      required: true,
    },
    observationEvent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
