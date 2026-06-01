const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/bookmark", bookmarkRoutes);

app.get("/", (req, res) => {
  res.send("Serveur mandeh tsara !"); //controller
});

module.exports = app;
