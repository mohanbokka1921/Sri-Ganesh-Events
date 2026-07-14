const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    eventDate: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    decorationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Decoration"
    },

    status: {
        type: String,
        default: "Pending"
    }

}, { timestamps: true });

module.exports =
mongoose.model(
    "Booking",
    bookingSchema
);