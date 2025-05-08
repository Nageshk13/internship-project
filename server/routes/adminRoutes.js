const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const Suggestion = require("../models/Suggestion");
const VolunteerTask = require("../models/VolunteerTask");
const Donation = require("../models/Donation");
const AuditLog = require("../models/AuditLog");
const ContactMessage = require("../models/ContactMessage"); // ✅ NEW MODEL

// 🛠 Create Event
router.post("/events", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create event", err });
  }
});

// 🛠 Get All Events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch events", err });
  }
});

// 🛠 Update Event
router.put("/events/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update event", err });
  }
});

// 🛠 Delete Event
router.delete("/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: "Event deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete event", err });
  }
});

// 🛠 Suggestions
router.get("/suggestions", async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load suggestions", err });
  }
});

// 🛠 Volunteer Tasks
router.get("/volunteer-tasks", async (req, res) => {
  try {
    const tasks = await VolunteerTask.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch volunteer tasks", err });
  }
});

// ✅ Donor Management
router.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch donations", err });
  }
});

// ✅ Overview Section
router.get("/overview-data", async (req, res) => {
  try {
    const donations = await Donation.find();
    const events = await Event.find();
    const tasks = await VolunteerTask.find();

    const monthlyIncome = Array(12).fill(0);
    donations.forEach((donation) => {
      const month = new Date(donation.createdAt).getMonth();
      monthlyIncome[month] += donation.amount;
    });

    const ongoingEvents = events;
    const completedEvents = tasks.filter(task => task.progress === "Completed");

    res.json({
      monthlyIncome,
      ongoingEvents,
      completedEvents,
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to load overview data", err });
  }
});

// ✅ Audit Logs
router.get("/audit-logs", async (req, res) => {
  try {
    const donations = await Donation.find();
    const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

    const logs = await AuditLog.find().sort({ createdAt: 1 }); // Oldest first
    let currentBalance = totalDonated;

    const enrichedLogs = logs.map(log => {
      if (log.type === "Expense") currentBalance -= log.amount;
      return {
        ...log.toObject(),
        balance: currentBalance
      };
    });

    res.json({
      logs: enrichedLogs.reverse(), // Newest first
      balance: currentBalance
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch audit logs", err });
  }
});

router.post("/audit-logs", async (req, res) => {
  try {
    const { amount, reason } = req.body;
    if (!amount || !reason) {
      return res.status(400).json({ msg: "Amount and reason required" });
    }

    const donations = await Donation.find();
    const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

    const expenses = await AuditLog.find({ type: "Expense" });
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

    const newBalance = totalDonated - totalSpent - amount;
    if (newBalance < 0) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    const newLog = await AuditLog.create({
      type: "Expense",
      amount,
      reason,
      balanceAfter: newBalance,
    });

    res.status(201).json({ msg: "Expense recorded", entry: newLog });
  } catch (err) {
    res.status(500).json({ msg: "Failed to log expense", err });
  }
});

// ✅ Notifications (Contact Us Messages)
router.get("/contact-messages", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load contact messages", err });
  }
});

module.exports = router;
