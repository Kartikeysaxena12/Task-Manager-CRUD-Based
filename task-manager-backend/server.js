require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Task schema and model
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

// API routes

// Get tasks by category and date
app.get("/api/tasks", async (req, res) => {
  const { category, date } = req.query;
  try {
    const tasks = await Task.find({ category, date });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Add a new task
app.post("/api/tasks", async (req, res) => {
  const { name, category, date } = req.body;
  try {
    const task = new Task({ name, category, date });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "Failed to add task" });
  }
});

// Update a task's name or completion status
app.put("/api/tasks/:id", async (req, res) => {
  const { name, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...(name && { name }), ...(completed !== undefined && { completed }) },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Failed to update task" });
  }
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
