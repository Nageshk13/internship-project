const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

const donorRoutes = require("./routes/donorRoutes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ NEW

dotenv.config();
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/suggestions", require("./routes/suggestionRoutes"));
app.use("/api/volunteer", require("./routes/volunteerRoutes"));
app.use("/api/donor", donorRoutes);
app.use("/api/contact", contactRoutes); // ✅ NEW route for Contact Us form

// ✅ Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
