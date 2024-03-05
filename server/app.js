const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const AuthenticateRoute = require("./middleware/authenticateRoute");

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
};

app.use(cors(corsOptions));

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Authenticate Route for user
app.use(AuthenticateRoute);


module.exports = app;
