const { Schema, model } = require("mongoose");

const Hangout = model(
  "Hangout",
  new Schema({
    userID: { type: Number, required: true },
    title: { type: String, required: true },
    place: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: false },
  })
);

module.exports = Hangout;
