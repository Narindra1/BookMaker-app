const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bookmarks");
    console.log("MongoDB connecté ");
  } catch (error) {
    console.error("Erreur de connexion ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
