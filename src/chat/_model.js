const { Schema, model } = require("mongoose");

const Chat = model(
  "Chat",
  new Schema({
    hangout: { type: String, required: true },
    messages: { type: [Object], required: false },
  })
);

module.exports = Chat;
