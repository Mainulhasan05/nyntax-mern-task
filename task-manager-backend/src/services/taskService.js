const Task = require("../models/taskSchema");
const TaskHistory = require("../models/taskHistorySchema");
const AssignHistory = require("../models/assignHistory");

exports.createTaskService = async (title, description, createdBy) => {
  try {
    const task = new Task({
      title,
      description,
      createdBy,
    });
    await task.save();
    return task;
  } catch (error) {
    throw new Error(error?.message);
  }
};

exports.getAllTasks = async () => {
  try {
    const tasks = await Task.find().populate("createdBy");
  } catch (error) {
    throw new Error(error?.message);
  }
};

exports.deleteTaskService = async (taskId, userId, isAdmin) => {
  try {
    const exists = await Task.findById(taskId);
    if (exists) {
      if (isAdmin) {
        const task = await Task.findByIdAndDelete(taskId);
      } else {
        if (exists.createdBy == userId) {
          const assign = await AssignHistory.deleteMany({
            taskId,
          });
          const taskHistory = await TaskHistory.deleteMany({
            taskId,
          });
          const task = await Task.findByIdAndDelete(taskId);
        } else {
          throw new Error("You don't have permission to delete");
        }
      }
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
