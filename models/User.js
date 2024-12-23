const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "Moderator" },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", UserSchema);
