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
