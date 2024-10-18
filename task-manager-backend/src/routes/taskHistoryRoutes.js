const express = require("express");
const router = express.Router();
const userAuthMiddleWare = require("../middlewares/authMiddleware");
const taskHistoryController = require("../controllers/taskHistoryController");

router.post("/", userAuthMiddleWare, taskHistoryController.addHistory);
router.get("/:taskId", userAuthMiddleWare, taskHistoryController.getMyTasks);

// router.post("/login", authController.login);

module.exports = router;
