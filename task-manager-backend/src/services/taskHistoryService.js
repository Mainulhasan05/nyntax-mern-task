const TaskHistory = require("../models/taskHistorySchema");

exports.createTaskHistoryService = async (
  taskId,
  submittedBy,
  status,
  feedback
) => {
  try {
    const taskHistory = new TaskHistory({
      taskId,
      submittedBy,
      status,
      feedback,
    });
    await taskHistory.save();
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

exports.getTaskHistory = async (taskId) => {
  try {
    const history = await TaskHistory.find({ taskId }).populate(
      "taskId submittedBy"
    );
    return history;
  } catch (error) {
    throw new Error(error.message);
  }
};
