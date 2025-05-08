const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const VolunteerTask = require("../models/VolunteerTask");

// ✅ GET assigned tasks for volunteer
router.get("/tasks/:email", async (req, res) => {
  try {
    const tasks = await Event.find({ type: "Task" }).sort({ date: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load tasks" });
  }
});

// ✅ UPDATE task progress in Event model
router.put("/tasks/update/:taskId", async (req, res) => {
  try {
    const { progress } = req.body;
    await Event.findByIdAndUpdate(req.params.taskId, { progress });
    res.json({ msg: "Progress updated" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update progress" });
  }
});

// ✅ NEW: Save submitted progress into VolunteerTask collection
router.post("/submit-progress", async (req, res) => {
  try {
    const { volunteerName, email, taskId, taskTitle, progress, deadline } = req.body;
    const newEntry = await VolunteerTask.create({
      volunteerName,
      email,
      taskId,
      title: taskTitle,
      progress,
      deadline,
    });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ msg: "Failed to submit progress", err });
  }
});
// Get Volunteer Task Assignments
router.get("/assigned-tasks/:email", async (req, res) => {
  try {
    const tasks = await VolunteerTask.find({ email: req.params.email });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load volunteer tasks" });
  }
});
// ✅ Get all events (for volunteers upcoming events tab)
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find({ type: { $ne: "Task" } }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load events" });
  }
});

module.exports = router;
