// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

// ✅ POST /api/contact/submit — Save Contact Us message
router.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const saved = await ContactMessage.create({ name, email, message });
    res.status(201).json({ msg: "Message received!", saved });
  } catch (err) {
    console.error("Failed to save contact message", err);
    res.status(500).json({ msg: "Server error while submitting message." });
  }
});

module.exports = router;
