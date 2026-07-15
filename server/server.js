require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const connectDB =
require("./config/db");

const decorationRoutes =
require("./routes/decorationRoutes");

const uploadRoutes =
require("./routes/uploadRoutes");

const app =
express();

connectDB();

app.use(cors());

app.use(
  express.json()
);

app.get(
  "/",
  (req, res) => {
    res.send(
      "Server Running"
    );
  }
);

app.use(
  "/api/decorations",
  decorationRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

const PORT =
process.env.PORT ||
5000;

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on ${PORT}`
    );
  }
);