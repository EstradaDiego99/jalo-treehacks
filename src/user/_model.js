const { Schema, model } = require("mongoose");

const User = model(
  "User",
  new Schema({
    id: { type: Number, required: true },
    access_token: { type: String, required: true },
  })
);

module.exports = User;
