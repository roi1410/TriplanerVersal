const Area = require("../models/areaModel");
const Hotel = require("../models/hotelModel")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

Area.hasMany(Hotel, {
    foreignKey: "areaId",
  });
Hotel.belongsTo(Area, {
    foreignKey: "areaId",
  });

// Create a new area and add it to the database -- output => new area
exports.registerHotel = async (req, res) => {
  try {
    const currentArea = await Area.findOne({where: { id: req.params.id }});

    const hotelExists = await Hotel.findOne({where: { areaId: currentArea.id ,hotelName: req.body.hotelName }});
    if (hotelExists) {
      return res.status(400).json({
        status: "fail",
        mesage: "Area already exists",
      });
    }

    const newHotel = await Hotel.create({...req.body,
        areaId: currentArea.dataValues.id,
      });

    res.status(201).json({
      hotel: newHotel,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll({});
    res.send(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting the hotels");
  }
};

// Retrieve a hotel from the database -- output =>  hotel
exports.getHotelById = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findByPk(hotelId);

    if (!hotel) {
      return res.status(404).send("hotel not found");
    }

    res.send(hotel);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//Updates a selected hotel -- output => updated hotel
exports.updateHotel = async (req, res) => {
  const hotelId = req.params.id;
  const newHotel = req.body;
  try {
    const existingHotel = await Hotel.findByPk(hotelId);

    if (!existingHotel) {
      return res.status(404).send("hotel not found");
    }

    // If the email is being updated, check for duplicates
    if (newHotel.hotelName && newHotel.hotelName !== existingHotel.hotelName) {
      const hotelExists = await Hotel.findOne({where: { hotelName: newHotel.hotelName }});
      if (hotelExists) {
        return res.status(401).json({
          status: "fail",
          message: "hotel name already exists",
        });
      }
    }

    // Update the hotel
    await existingHotel.update({ ...newHotel })
    await existingHotel.save();
    res.status(200).send(existingHotel);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//Deletes a selected hotel -- output => updated hotel
exports.deleteHotel = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const deletedHotel = await Hotel.findByPk(hotelId);
    await deletedHotel.destroy();

    if (!deletedHotel) {
      return res.status(404).send("hotel not found");
    }

    res.send(deletedHotel);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

