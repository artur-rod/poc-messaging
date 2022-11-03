const mongoose = require("../libs/database/mongodb");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  newsletter: {
    type: "boolean",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
