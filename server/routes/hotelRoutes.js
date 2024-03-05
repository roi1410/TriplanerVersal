const express = require("express");
const router = express.Router();
const hotel = require("../controllers/hotelController");

router.route("/new/:id").post(hotel.registerHotel);
router.route("/update/:id").patch(hotel.updateHotel);
router.route("/delete/:id").delete(hotel.deleteHotel);
router.route("/:id").get(hotel.getHotelById);

module.exports = router;