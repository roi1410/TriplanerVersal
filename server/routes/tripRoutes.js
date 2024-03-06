const express = require("express");
const router = express.Router();
const trip = require("../controllers/tripController");

router.route("/new/:id").post(trip.registerTrip);
router.route("/update/:id").patch(trip.updateTrip);
router.route("/delete/:id").delete(trip.deleteTrip);
router.route("/:id").get(trip.getTripById);
router.route("/getall").post(trip.getTrips);

module.exports = router;