const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(400).json({
        message: "token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECREAT);
      console.log(decode);
      res.user = decode;
    } catch (error) {
      return res.status(400).json({
        message: "There is an issue in verification of token",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something issue in getting the token",
    });
  }

  next();
};

exports.isVisitor = (req, res, next) => {
  try {
    if (res.user.role !== "Visitor") {
      return res.status(400).json({
        message: "You are not an authorized person",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "The role is not matching",
    });
  }
  next();
};

exports.isBlogger = (req, res, next) => {
  try {
    if (res.user.role !== "Blogger") {
      return res.status(400).json({
        message: "You are not an authorized person",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "The role is not matching",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  try {
    if (res.user.role !== "Admin") {
      return res.status(400).json({
        message: "You are not an authorized person",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "The role is not matching",
    });
  }
  next();
};
