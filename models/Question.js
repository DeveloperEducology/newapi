const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String },
  answer_options: Array,
  type: {
    type: String,
  },
  correct_option: { type: String },
  category: { type: String },
  tag: Array,
  type: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("questionss", questionSchema);
