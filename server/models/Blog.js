const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({

  title: String,

  content: String,

  category: String,

  images: [String],

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports =
  mongoose.model(
    "Blog",
    BlogSchema
  );