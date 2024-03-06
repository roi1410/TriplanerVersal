const express = require("express");
const router = express.Router();
const flight = require("../controllers/flightController");

router.route("/new/:id").post(flight.registerFlight);
router.route("/update/:id").patch(flight.updateFlight);
router.route("/delete/:id").delete(flight.deleteFlight);
router.route("/:id").get(flight.getFlightById);
router.route("/getall").post(flight.getFlights);

module.exports = router;