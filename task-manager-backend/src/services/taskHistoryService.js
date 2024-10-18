const TaskHistory = require("../models/taskHistorySchema");
const Task = require("../models/taskSchema");
exports.createTaskHistoryService = async (
  taskId,
  updatedBy,
  status,
  feedback
) => {
  try {
    const taskExists = await TaskHistory({ taskId });
    if (taskExists) {
      const taskHistory = new TaskHistory({
        taskId,
        updatedBy,
        status,
        feedback,
      });
      await taskHistory.save();
      await Task.findByIdAndUpdate(taskId, {
        $set: {
          last_status: status,
        },
      });
      return taskHistory;
    } else {
      throw new Error("Task Not Found");
    }
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
      "taskId updatedBy"
    );
    return history;
  } catch (error) {
    throw new Error(error.message);
  }
};
