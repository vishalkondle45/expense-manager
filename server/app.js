const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("../server/routes/user");
const groupRoutes = require("../server/routes/group");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// To Allow Frontend to send requests
// app.use(cors());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// To tell that req.body will be in JSON
app.use(express.json());

// To send token as cookie in requests
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api/group", groupRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log(`DB is connected and listening to 5000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
