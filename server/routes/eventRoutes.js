const express = require("express");
const router = express.Router();
const event = require("../controllers/eventController");

router.route("/new/:id").post(event.registerEvent);
router.route("/update/:id").patch(event.updateEvent);
router.route("/delete/:id").delete(event.deleteEvent);
router.route("/:id").get(event.getEventById);

module.exports = router;