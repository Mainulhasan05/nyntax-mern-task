const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db_config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const taskAssignRoutes = require("./routes/taskAssignRoutes");
const taskHistoryRoutes = require("./routes/taskHistoryRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

app.get("/", (req, res) => {
  // welcome and return the ip address of the client
  res.json({
    message: "Welcome to the Task Manager API",
    ip: req.ip,
  });
});

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/assign", taskAssignRoutes);
app.use("/api/history", taskHistoryRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 671259553a0484cd6638e985  task id
