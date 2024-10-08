// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  completed: { type: Boolean, default: false },
  order: { type: Number, default: 0 }, // New order field
});

module.exports = mongoose.model("Task", taskSchema);
