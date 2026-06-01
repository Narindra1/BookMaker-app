const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  category: String,
  isFavourite: { type: Boolean, default: false },
  visitCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
