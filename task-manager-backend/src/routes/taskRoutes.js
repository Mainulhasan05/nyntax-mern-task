const express = require("express");
const router = express.Router();
const userAuthMiddleWare = require("../middlewares/authMiddleware");
const taskController = require("../controllers/taskController");

router.post("/create", userAuthMiddleWare, taskController.createTask);
router.delete("/:id", userAuthMiddleWare, taskController.deleteTask);
// router.post("/login", authController.login);

module.exports = router;
