const mongoose = require("mongoose");

const taskHistorySchema = new mongoose.Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "IN PROGRESS", "IN REVIEW", "IN TEST", "COMPLETED"],
      default: "PENDING",
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaskHistory", taskHistorySchema);
