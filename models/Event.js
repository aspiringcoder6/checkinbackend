const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  limited: { type: Boolean, required: true, default: false },
  maximumNumber: { type: Number, required: true },
  participants: [
    {
      Name: { type: String, required: true },
      MSSV: { type: String, required: true },
      checkinTime: { type: String },
      status: { type: Boolean, required: true, default: false },
    },
  ],
  info: {
    name: { type: String },
    contact: { type: String },
  },
  checkInLink: {
    type: String,
  },
  sheetLink: {
    type: String,
  },
});
module.exports = mongoose.model("Event", EventSchema);
