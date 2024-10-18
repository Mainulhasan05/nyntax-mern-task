const sendResponse = require("../utils/sendResponse.js");
const taskHistoryService = require("../services/taskHistoryService.js");

exports.addHistory = async (req, res, next) => {
  try {
    const { taskId, status, feedback } = req.body;
    const updatedBy = req.user.id;
    const task = await taskHistoryService.createTaskHistoryService(
      taskId,
      updatedBy,
      status,
      feedback
    );
    sendResponse(res, 201, true, "Task History Addedd Successfully", task);
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};

exports.getTaskHistory = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const taskHistory = await taskHistoryService.getTaskHistory(taskId);
    sendResponse(
      res,
      200,
      true,
      "Task History Fetched Successfully",
      taskHistory
    );
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};
