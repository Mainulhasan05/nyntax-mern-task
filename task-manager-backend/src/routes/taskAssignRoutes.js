const express = require("express");
const router = express.Router();
const userAuthMiddleWare = require("../middlewares/authMiddleware");
const taskAssignController = require("../controllers/taskAssignController");

router.post("/", userAuthMiddleWare, taskAssignController.assignTask);
router.get("/", userAuthMiddleWare, taskAssignController.getMyTasks);

// router.post("/login", authController.login);

module.exports = router;
