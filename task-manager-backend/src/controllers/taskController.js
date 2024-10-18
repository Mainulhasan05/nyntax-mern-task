const sendResponse = require("../utils/sendResponse.js");
const taskService = require("../services/taskService.js");

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

exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const isAdmin = req.user.role == "admin" ? true : false;
    const task = await taskService.deleteTaskService(
      taskId,
      req.user.id,
      isAdmin
    );
    sendResponse(res, 200, true, "Task Deleted Successfully", null);
  } catch (error) {
    sendResponse(res, 500, false, error?.message, null);
  }
};

exports.getTaskList = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    sendResponse(res, 200, true, "Task Fetched Successfully", tasks);
  } catch (error) {
    sendResponse(res, 500, false, error?.message, null);
  }
};
