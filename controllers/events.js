const Event = require("../models/Event");
const moment = require("moment");
exports.createEvent = async (req, res, next) => {
  const eventData = req.body.eventData;
  const newEvent = new Event({ ...eventData });
  await newEvent.save();
  return res.status(200).json({ message: "Event được tạo thành công!" });
};
exports.getEvents = async (req, res, next) => {
  const events = await Event.find();
  return res.status(200).json({ events: events });
};
exports.getNearEvents = async (req, res, next) => {
  try {
    const currentDate = moment().startOf("day");
    const futureDate = moment().add(7, "days").endOf("day");

    const event = await Event.find({
      date: {
        $gte: currentDate.toDate(),
        $lt: futureDate.toDate(),
      },
    });

    res.status(200).json({
      event: event,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getPastEvents = async (req, res, next) => {
  try {
    const currentDate = moment().startOf("day");
    const event = await Event.find({
      date: {
        $lt: currentDate.toDate(),
      },
    });

    res.status(200).json({
      event: event,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getEvent = async (req, res, next) => {
  const id = req.query.id;
  try {
    const event = await Event.findById(id);
    return res.status(200).json({ event: event });
  } catch (err) {
    console.log(err);
  }
};
exports.getCurrentEvent = async (req, res, next) => {
  try {
    const currentDate = moment().format("YYYY-MM-DD");
    const currentTime = moment().format("HH:mm");
    const currentEvent = await Event.findOne({
      date: {
        $gte: new Date(currentDate),
        $lt: new Date(moment(currentDate).add(1, "day").format("YYYY-MM-DD")),
      },
      startTime: { $lte: currentTime },
      endTime: { $gte: currentTime },
    });
    if (!currentEvent) {
      return res.status(404).json({ message: "No current event found." });
    }

    res.status(200).json({
      event: currentEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};
exports.editEvent = async (req, res, next) => {
  const eventData = req.body.eventData;
  const id = req.body.id;
  try {
    const editedEvent = await Event.findById(id);
    Object.assign(editedEvent, eventData);
    await editedEvent.save();
    return res.status(200).json({
      message: "Chỉnh sửa event thành công!",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.deleteEvent = async (req, res, next) => {
  const id = req.query.id;
  try {
    await Event.deleteOne({ _id: id });
    return res.status(200).json({
      message: "Xóa event thành công!",
    });
  } catch (err) {
    console.log(err);
  }
};
