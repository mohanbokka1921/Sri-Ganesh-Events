require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const decorationRoutes =
require("./routes/decorationRoutes");

const uploadRoutes =
require("./routes/uploadRoutes");

const adminRoutes =
require("./routes/adminRoutes");

const bookingRoutes =
require("./routes/bookingRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Server Running");
});

// Decoration Routes
app.use(
    "/api/decorations",
    decorationRoutes
);

// Upload Routes
app.use(
    "/api/upload",
    uploadRoutes
);

// Admin Routes
app.use(
    "/api/admin",
    adminRoutes
);

// Booking Routes
app.use(
    "/api/bookings",
    bookingRoutes
);

// Start Server
const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `🚀 Server running on port ${PORT}`
    );
});