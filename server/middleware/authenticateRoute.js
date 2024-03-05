const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const authenticateRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({ message: "Unauthorized: Missing token" });
    }

    const decoded = jwt.verify(token, secret);
    const userExists = await User.findOne({ _id: decoded._id });

    if (!userExists) {
      return res.status(401).send({ message: "Unauthorized: User not found" });
    }

    // If user exists and token is valid, proceed to the next middleware
    next();
  } catch (error) {
    res.status(500).json({ message: error.message || "An error occurred." });
  }
};
module.exports = authenticateRoute;
