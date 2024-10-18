const sendResponse = require("../utils/sendResponse.js");
const userAuthService = require("../services/authService.js");

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;
    const token = await userAuthService.registerUser(
      name,
      email,
      password,
      role
    );
    sendResponse(res, 201, true, "Registration Success", { token });
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};
// Login a new user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userAuthService.loginUser(email, password);
    sendResponse(res, 200, true, "Login Success", { token });
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userAuthService.getAllUsers();
    sendResponse(res, 200, true, "User Fetched Successfully", users);
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};
