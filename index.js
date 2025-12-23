const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000;

const connectDB = require("./config/db");
connectDB();

const route = require("./routes/route");
app.use(express.json());
app.use("/api", route);

app.listen(port, () => {
  console.log("The Server has started");
});
