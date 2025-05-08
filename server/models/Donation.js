const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  amount: { type: Number, required: true },
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

module.exports = mongoose.model("Donation", donationSchema);
