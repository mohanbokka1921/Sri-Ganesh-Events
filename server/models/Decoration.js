const mongoose = require("mongoose");

const decorationSchema =
new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  code: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

module.exports =
mongoose.model(
  "Decoration",
  decorationSchema
);