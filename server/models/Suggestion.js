const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    type: { type: String }, // e.g., "Feature", "Issue", "General"
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Suggestion", suggestionSchema);
