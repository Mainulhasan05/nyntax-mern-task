const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
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

  // Create new user
  user = new User({
    name,
    email,
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
};
