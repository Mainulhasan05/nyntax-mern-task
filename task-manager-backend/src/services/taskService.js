const Task = require("../models/taskSchema");

exports.createTaskService = async (title, description, createdBy) => {
  try {
    const task = new Task({
      title,
      description,
      createdBy,
    });
    return task;
  } catch (error) {
    throw new Error(error?.message);
  }
};
