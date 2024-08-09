// routes/tasks.js
const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Create a new task
router.post("/", async (req, res) => {
  const { title, category, date } = req.body;
  try {
    const newTask = new Task({ title, category, date });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, category, date, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, category, date, completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
