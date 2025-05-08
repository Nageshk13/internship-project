const mongoose = require("mongoose");

const volunteerTaskSchema = new mongoose.Schema(
  {
    volunteerName: { type: String, required: true },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    progress: {
      type: String,
      enum: ["Not started", "In progress", "Completed"],
      default: "Not started",
    },
    deadline: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VolunteerTask", volunteerTaskSchema);
