const Trip = require("../models/tripModel");
const Area = require("../models/areaModel")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

Trip.hasMany(Area, {
    foreignKey: "tripId",
  });
Area.belongsTo(Trip, {
    foreignKey: "tripId",
  });

// Create a new trip and add it to the database -- output => new trip
exports.registerArea = async (req, res) => {
  try {
    const currentTrip = await Trip.findOne({where: { id: req.params.id }});

    const areaExists = await Area.findOne({where: { tripId: currentTrip.id ,areaName: req.body.areaName }});
    if (areaExists) {
      return res.status(400).json({
        status: "fail",
        mesage: "Trip already exists",
      });
    }

    const newArea = await Area.create({...req.body,
        tripId: currentTrip.dataValues.id,
      });

    res.status(201).json({
      area: newArea,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAreas = async (req, res) => {
  try {
    const areas = await Area.findAll({});
    res.send(areas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting the areas");
  }
};

// Retrieve a area from the database -- output =>  area
exports.getAreaById = async (req, res) => {
  const areaId = req.params.id;
  try {
    const area = await Area.findByPk(areaId);

    if (!area) {
      return res.status(404).send("area not found");
    }

    res.send(area);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//Updates a selected area -- output => updated area
exports.updateArea = async (req, res) => {
  const areaId = req.params.id;
  const newArea = req.body;
  try {
    const existingArea = await Area.findByPk(areaId);

    if (!existingArea) {
      return res.status(404).send("area not found");
    }

    // If the email is being updated, check for duplicates
    if (newArea.areaName && newArea.areaName !== existingArea.areaName) {
      const areaExists = await Area.findOne({where: { areaName: newArea.areaName }});
      if (areaExists) {
        return res.status(401).json({
          status: "fail",
          message: "area name already exists",
        });
      }
    }

    // Update the area
    await existingArea.update({ ...newArea })
    await existingArea.save();
    res.status(200).send(existingArea);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//Deletes a selected area -- output => updated area
exports.deleteArea = async (req, res) => {
  const areaId = req.params.id;
  try {
    const deletedTrip = await Trip.findByPk(areaId);
    await deletedTrip.destroy();

    if (!deletedTrip) {
      return res.status(404).send("area not found");
    }

    res.send(deletedTrip);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

