const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "client",
      enum: ["admin", "client"],
      required: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
