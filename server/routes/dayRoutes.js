const express = require("express");
const router = express.Router();
const day = require("../controllers/dayController");

router.route("/new/:id").post(day.registerDay);
router.route("/update/:id").patch(day.updateDay);
router.route("/delete/:id").delete(day.deleteDay);
router.route("/:id").get(day.getDayById);
router.route("/remove/:id").post(day.removeValueDay);

module.exports = router;