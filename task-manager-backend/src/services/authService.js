const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user?._id, role: user?.role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.registerUser = async (name, email, password, role) => {
  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }
  // password length must be greater than 5
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  // validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email address");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  // Create new user
  user = new User({
    name,
    email,
    password: hashPassword,
    role,
  });

  await user.save();

  let token = generateToken(user);

  return token;
};

exports.loginUser = async (email, password) => {
  let user = await User.findOne({
    email,
  });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  let token = generateToken(user);
  return token;
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error?.message);
  }
};
