// models/AuditLog.js

const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: function () {
        return this.type === "Expense";
      },
    },
    balanceAfter: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
