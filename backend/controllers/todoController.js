const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.user.id,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
