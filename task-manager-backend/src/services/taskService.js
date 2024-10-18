const Task = require("../models/taskSchema");

exports.createTaskService = async (title, description, createdBy) => {
  try {
    const task = new Task({
      title,
      description,
      createdBy,
    });
    return task;
  } catch (error) {
    throw new Error(error?.message);
  }
};

exports.deleteTaskService = async (taskId) => {
  try {
    const exists = await Task.findById(taskId);
    if (exists) {
      const task = await Task.findByIdAndDelete(taskId);
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
