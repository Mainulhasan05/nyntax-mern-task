const sendResponse = require("../utils/sendResponse.js");
const taskAssignService = require("../services/taskAssignService.js");

exports.assignTask = async (req, res, next) => {
  try {
    const { taskId, assignedTo, deadline } = req.body;

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
        taskId,
        req.user.id,
        assignedTo,
        deadline
      );
      sendResponse(res, 201, true, "Task Assigned Successfully", task);
    }
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};

exports.getMyTasks = async (req, res, next) => {
  try {
    const assignedTo = req.user.id;

    const tasks = await taskAssignService.getMyTasks(assignedTo);
    sendResponse(res, 200, true, "Task Fetched Successfully", tasks);
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};
