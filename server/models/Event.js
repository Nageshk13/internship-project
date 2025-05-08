const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Campaign", "Task", "Event", "Announcement"],
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    date: Date,
    goalAmount: Number,
    raisedAmount: { type: Number, default: 0 },

    // ✅ Add this:
    status: {
      type: String,
      enum: ["Ongoing", "Completed"],
      default: "Ongoing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
