const Area = require("../models/areaModel");
const Flight = require("../models/flightModel")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

Area.hasMany(Flight, {
    foreignKey: "areaId",
  });
Flight.belongsTo(Area, {
    foreignKey: "areaId",
  });

// Create a new area and add it to the database -- output => new area
exports.registerFlight = async (req, res) => {
  try {
    const currentArea = await Area.findOne({where: { id: req.params.id }});

    const flightExists = await Flight.findOne({where: { areaId: currentArea.id ,flightName: req.body.flightName }});
    if (flightExists) {
      return res.status(400).json({
        status: "fail",
        mesage: "Area already exists",
      });
    }

    const newFlight = await Flight.create({...req.body,
        areaId: currentArea.dataValues.id,
      });

    res.status(201).json({
      flight: newFlight,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getFlights = async (req, res) => {
  try {
    const filter = req.body
    const flights = await Flight.findAll({where:filter});
    res.send(flights);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting the flights");
  }
};

// Retrieve a flight from the database -- output =>  flight
exports.getFlightById = async (req, res) => {
  const flightId = req.params.id;
  try {
    const flight = await Flight.findByPk(flightId);

    if (!flight) {
      return res.status(404).send("flight not found");
    }

    res.send(flight);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//Updates a selected flight -- output => updated flight
exports.updateFlight = async (req, res) => {
  const flightId = req.params.id;
  const newFlight = req.body;
  try {
    const existingFlight = await Flight.findByPk(flightId);

    if (!existingFlight) {
      return res.status(404).send("flight not found");
    }

    // If the email is being updated, check for duplicates
    if (newFlight.flightName && newFlight.flightName !== existingFlight.flightName) {
      const flightExists = await Flight.findOne({where: { flightName: newFlight.flightName }});
      if (flightExists) {
        return res.status(401).json({
          status: "fail",
          message: "flight name already exists",
        });
      }
    }

    // Update the flight
    await existingFlight.update({ ...newFlight })
    await existingFlight.save();
    res.status(200).send(existingFlight);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//Deletes a selected flight -- output => updated flight
exports.deleteFlight = async (req, res) => {
  const flightId = req.params.id;
  try {
    const deletedFlight = await Flight.findByPk(flightId);
    await deletedFlight.destroy();

    if (!deletedFlight) {
      return res.status(404).send("flight not found");
    }

    res.send(deletedFlight);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

