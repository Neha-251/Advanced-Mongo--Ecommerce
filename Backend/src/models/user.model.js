const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    addresses: [
      {
        line: { type: String, required: true },
        area: { type: String, required: false },
        city: { type: String, required: true },
        state: { type: String, required: true },
        address_type: { type: String, required: false },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;