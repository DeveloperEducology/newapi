const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: String },
  category: { type: String },
  tag: Array,
  type: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("products", productSchema);
