const sendResponse = require("../utils/sendResponse.js");
const taskHistoryService = require("../services/taskHistoryService.js");

exports.addHistory = async (req, res, next) => {
  try {
    const { taskId, status, feedback } = req.body;

    if (req.user.role == "user") {
      sendResponse(
        res,
        500,
        false,
        "You don't have permission to assign task",
        null
      );
    } else {
      const task = await taskHistoryService.createTaskHistoryService(
        taskId,
        req.user.id,
        status,
        feedback
      );
      sendResponse(res, 201, true, "Task History Addedd Successfully", task);
    }
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};

exports.getTaskHistory = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
  } catch (error) {}
};
