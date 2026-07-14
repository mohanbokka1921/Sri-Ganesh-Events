const mongoose = require("mongoose");

const decorationSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    images: {
        type: [String],
        default: []
    },

    description: {
        type: String
    },

    flowersUsed: {
        type: [String]
    },

    materialsUsed: {
        type: [String]
    }

}, { timestamps: true });

module.exports =
mongoose.model(
    "Decoration",
    decorationSchema
);