const sendResponse = require("../utils/sendResponse.js");
const taskService = require("../services/taskService.js");

// Register a new user
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (req.user.role == "user") {
      sendResponse(
        res,
        500,
        false,
        "You don't have permission to creeate task",
        null
      );
    } else {
      const task = await taskService.createTaskService(
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
