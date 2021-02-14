const { Schema, model } = require("mongoose");

const User = model(
  "User",
  new Schema({
    id: { type: Number, required: true },
  })
);

module.exports = User;
