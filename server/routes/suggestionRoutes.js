const express = require("express");
const router = express.Router();
const Suggestion = require("../models/Suggestion");

// POST - Submit Suggestion
router.post("/", async (req, res) => {
  try {
    const { name, email, type, message } = req.body;
    const suggestion = new Suggestion({ name, email, type, message });
    await suggestion.save();
    res.status(201).json({ msg: "Suggestion saved" });
  } catch (err) {
    res.status(500).json({ msg: "Error saving suggestion" });
  }
});

// GET - Get All Suggestions
router.get("/", async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load suggestions" });
  }
});

module.exports = router;
