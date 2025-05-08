const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Donor", "Volunteer", "Admin"],
      required: true,
    },
    skills: { type: String },
    availability: { type: String },
    resetPasswordToken: { type: String },       // ✅ Token hash
    resetPasswordExpire: { type: Date },        // ✅ Expiry time
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
