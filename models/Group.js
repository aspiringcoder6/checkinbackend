const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  participants: [
    {
      Name: { type: String, required: true },
      MSSV: { type: String, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Group", GroupSchema);
