const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
    match: /.+@.+\..+/,
  },
  userPASS: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  adminCollection: {
    type: [Number],
    default: [],
  },
});

module.exports = mongoose.model("Admin", adminSchema, "admins");
