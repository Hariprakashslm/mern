const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  role: String,
  updatedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UserSchema, "users");
