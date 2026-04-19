const mongoose = require("mongoose");
///por que se llama admin?

//nombre raros de campos pass id- no veo name password-email etc unique 
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
