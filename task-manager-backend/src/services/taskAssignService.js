const TaskAssignHistory = require("../models/assignHistory");

exports.createTaskAssignHistoryService = async (
  taskId,
  assignedBy,
  assignedTo,
  deadline
) => {
  try {
    const taskHistory = new TaskAssignHistory({
      taskId,
      assignedBy,
      assignedTo,
      deadline,
    });
    return taskHistory;
  } catch (error) {
    throw new Error(error?.message);
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
