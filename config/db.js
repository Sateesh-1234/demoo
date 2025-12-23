const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected with Mongodb database");
    })
    .catch((err) => console.error(err));
};

module.exports = connectDB;
