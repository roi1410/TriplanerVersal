const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const AuthenticateRoute = require("../middleware/authenticateRoute");

// router.route("/").get(user.getUsers);
router.route("/register").post(user.registerUser);
router.route("/login").post(user.loginUser);
router.route("/logout").get(user.logoutUser);

// Authenticae Route
router.use(AuthenticateRoute);

router.route("/update/:id").patch(user.updateUser);
router.route("/delete/:id").delete(user.deleteUser);
// router.route("/:id").get(user.getUserById);

module.exports = router;
