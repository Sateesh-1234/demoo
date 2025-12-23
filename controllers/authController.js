const User = require("../models/authNModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existedData = await User.findOne({ email });
    if (existedData) {
      return res.status(400).json({
        isSuccess: false,
        message: "User already existed",
      });
    }

    let hasedPwd;
    try {
      hasedPwd = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        isSuccess: false,
        message: "Error in hashing",
      });
    }

    const userData = await User.create({
      name,
      email,
      password: hasedPwd,
      role,
    });

    res.status(200).json({
      isSuccess: true,
      message: "Account created",
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: "User can not be ctretaed, please try again later",
    });
  }
};

// login controller
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({
        message: "please fill all the details",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or Password",
      });
    }

    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECREAT, {
        expiresIn: "30m",
      });
      console.log(token);
      res.status(200).json({
        message: "Successfully logged in",
        token: token,
        data: user,
      });
    } else {
      return res.status(400).json({
        message: "Invalid email or Password",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Login failed",
    });
  }
};
