const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    cat_name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Category = mongoose.model("category", categorySchema);

module.exports = Category;