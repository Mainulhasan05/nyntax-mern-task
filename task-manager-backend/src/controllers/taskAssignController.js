const sendResponse = require("../utils/sendResponse.js");
const taskAssignService = require("../services/taskAssignService.js");

exports.assignTask = async (req, res, next) => {
  try {
    const { taskId } = req.body;

    if (req.user.role == "user") {
      sendResponse(
        res,
        500,
        false,
        "You don't have permission to assign task",
        null
      );
    } else {
      const task = await taskAssignService.createTaskAssignHistoryService(
        title,
        description,
        req.user.id
      );
      sendResponse(res, 201, true, "Task Created Successfully", task);
    }
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};
