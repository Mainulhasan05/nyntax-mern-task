const TaskHistory = require("../models/taskHistorySchema");

exports.createTaskHistoryService = async (taskId, submittedBy, status) => {
  try {
    const taskHistory = new TaskHistory({
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
    const exists = await TaskHistory.findById(taskId);
    if (exists) {
      const task = await TaskHistory.findByIdAndDelete(taskId);
    } else {
      throw new Error("TaskHistory not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
