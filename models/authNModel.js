const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Blogger", "Visitor"],
    default: "Visitor",
  },
});
module.exports = mongoose.model("User", userSchema);

// sateesh10kcoders_db_user
// WOYc6jfNZRPIl6LT
// mongodb+srv://sateesh10kcoders_db_user:WOYc6jfNZRPIl6LT@cluster0.ox8gxav.mongodb.net/
