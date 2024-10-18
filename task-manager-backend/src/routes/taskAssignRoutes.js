const express = require("express");
const router = express.Router();
const userAuthMiddleWare = require("../middlewares/authMiddleware");
const taskAssignController = require("../controllers/taskAssignController");

router.post("/create", userAuthMiddleWare, taskAssignController.assignTask);

// router.post("/login", authController.login);

module.exports = router;
