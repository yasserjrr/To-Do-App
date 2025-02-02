const { mongoose } = require("mongoose");
const Todo = new mongoose.Schema({
  id: string,
  title: string,
  description: string,
  dueDate: string,
  status: "pending" | "completed",
});

module.exports = mongoose.model("Todo", todoSchema);
