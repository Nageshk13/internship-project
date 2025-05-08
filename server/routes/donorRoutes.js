const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer"); // ✅ Import nodemailer
const Event = require("../models/Event");
const VolunteerTask = require("../models/VolunteerTask");
const Donation = require("../models/Donation");
const AuditLog = require("../models/AuditLog");

// ✅ Save Donation Details and Auto-log to Audit Logs as Income
router.post("/save-donation", async (req, res) => {
  try {
    const { name, email, contact, address, amount } = req.body;

    // Save donation
    const donation = new Donation({
      name,
      email,
      contact,
      address,
      amount,
      date: new Date(),
    });
    await donation.save();

    // ✅ Find latest balance from audit logs
    const latestLog = await AuditLog.findOne().sort({ createdAt: -1 });
    const previousBalance = latestLog?.balanceAfter || 0;
    const newBalance = previousBalance + parseFloat(amount);

    // ✅ Create new AuditLog entry as income
    const logEntry = new AuditLog({
      type: "Income",
      amount: parseFloat(amount),
      reason: "",
      balanceAfter: newBalance,
    });
    await logEntry.save();

    res.status(201).json({ message: "Donation and audit log saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to save donation or audit log" });
  }
});

// ✅ Send Confirmation Email with Receipt
router.post("/send-confirmation-email", async (req, res) => {
  try {
    const { name, email, contact, address, amount } = req.body;

    // ✅ Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // ✅ Use environment variables
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Charity Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Your Donation ❤️",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #4CAF50;">Dear ${name},</h2>
          <p>Thank you for your generous donation! 🙏</p>
          <p><strong>Here are your donation details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Contact:</strong> ${contact}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Amount:</strong> ₹${amount}</li>
          </ul>
          <p style="margin-top: 20px;">"No act of kindness, no matter how small, is ever wasted." – Aesop</p>
          <p>Warm regards,<br/>Charity Management Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Confirmation email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ msg: "Failed to send confirmation email" });
  }
});

module.exports = router;
