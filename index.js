require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const eventsRoutes = require("./routes/events");
const groupRoutes = require("./routes/group");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/events", eventsRoutes);
app.use("/groups", groupRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(process.env.PORT || 8000);
  })
  .catch((err) => {
    console.log(err);
  });
