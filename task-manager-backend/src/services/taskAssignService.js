const TaskAssignHistory = require("../models/assignHistory");
const User = require("../models/userSchema");

exports.createTaskAssignHistoryService = async (
  taskId,
  assignedBy,
  assignedTo,
  deadline
) => {
  try {
    const user = await User.findById(assignedTo);
    if (user) {
      const alreadyAssigned = await TaskAssignHistory.findOne({
        assignedTo,
        taskId,
      });
      if (!alreadyAssigned) {
        const taskHistory = new TaskAssignHistory({
          taskId,
          assignedBy,
          assignedTo,
          deadline,
        });
        await taskHistory.save();
        return taskHistory;
      } else {
        throw new Error("Task is already assigned to the user");
      }
    } else {
      throw new Error("Assigning User Doesn't Exists");
    }
  } catch (error) {
    throw new Error(error?.message);
  }
};

exports.getMyTasks = async (assignedTo) => {
  try {
    const tasks = await TaskAssignHistory.find({
      assignedTo,
    }).populate("taskId assignedBy");
    return tasks;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteTaskAssignHistoryService = async (taskId) => {
  try {
    const exists = await TaskAssignHistory.findById(taskId);
    if (exists) {
      const task = await TaskAssignHistory.findByIdAndDelete(taskId);
    } else {
      throw new Error("TaskAssignHistory not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
