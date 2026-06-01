const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

app.use(cors());
app.use(express.json());
//routes
app.use("/api/bookmark", bookmarkRoutes);

//middleware

//controllers

const start = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Serveur lancé ");
    });
  } catch (error) {
    console.error(error);
  }
};

start();

app.get("/", (req, res) => {
  res.send("Serveur mandeh tsara !"); //controller
});

module.exports = app;
