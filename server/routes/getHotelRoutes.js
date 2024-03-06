const express = require("express");
const router = express.Router();
const GetHotel = require("../controllers/getHotelController");

router.route("/find").get(GetHotel.getHotelInfo);

module.exports = router;