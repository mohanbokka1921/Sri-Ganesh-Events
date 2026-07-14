require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const decorationRoutes =
require("./routes/decorationRoutes");

const adminRoutes =
require("./routes/adminRoutes");

const uploadRoutes =
require("./routes/uploadRoutes");

const bookingRoutes =
require("./routes/bookingRoutes");


const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve Uploaded Images
app.use(
    "/uploads",
    express.static("uploads")
);

// Test Route
app.get("/", (req, res) => {
    res.send("Server Running");
});

// Decoration Routes
app.use(
    "/api/decorations",
    decorationRoutes
);

// Admin Routes
app.use(
    "/api/admin",
    adminRoutes
);

// Upload Routes
app.use(
    "/api/upload",
    uploadRoutes
);

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

