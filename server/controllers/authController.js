const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const allowedAdminEmails = ["nageshk88611@gmail.com", "admin2@charity.org"]; // ✅ Only these can login as admins

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, skills, availability } = req.body;

    // ❌ Prevent Admin registration from frontend
    if (role === "Admin") {
      return res.status(403).json({ msg: "You cannot register as an Admin" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hash,
      role,
      skills: role === "Volunteer" ? skills : undefined,
      availability: role === "Volunteer" ? availability : undefined,
    });

    const token = generateToken(newUser);
    res.status(201).json({ token, user: { name, email, role } });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed", err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // ✅ Check if Admin trying to login with allowed emails
    if (user.role === "Admin" && !allowedAdminEmails.includes(email)) {
      return res.status(403).json({ msg: "Access denied: Not a valid admin" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token, user: { name: user.name, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", err });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Email not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashed;
    user.resetPasswordExpire = Date.now() + 1000 * 60 * 10; // 10 mins
    await user.save();

    const link = `http://localhost:3000/reset-password/${resetToken}`;
    await sendEmail(email, "Password Reset Request", `Reset your password: ${link}`);

    res.json({ msg: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ msg: "Reset request failed", err });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashed,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Token expired or invalid" });

    const { newPassword } = req.body;
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Reset failed", err });
  }
};

