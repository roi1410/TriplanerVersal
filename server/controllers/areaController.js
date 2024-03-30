const Trip = require("../models/tripModel");
const Area = require("../models/areaModel");
const Day = require("../models/dayModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;
const { Op } = require("sequelize");

Trip.hasMany(Area, {
  foreignKey: "tripId",
});
Area.belongsTo(Trip, {
  foreignKey: "tripId",
});

// Create a new trip and add it to the database -- output => new trip
exports.registerArea = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.id);
    const currentTrip = await Trip.findOne({ where: { id: req.params.id } });

    const areaExists = await Area.findOne({
      where: { tripId: currentTrip.id, areaName: req.body.areaName },
    });
    if (areaExists) {
      return res.status(400).json({
        status: "fail",
        message: "Trip already exists",
      });
    }
    const newArea = await Area.create({
      areaName: req.body.areaName,
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
    const filter = req.body;
    const areas = await Area.findAll({
      include: [
        {
          association: "Days",
          include: [
            "Hotel",
            {
              association: "Flights",
            },
            {
              association: "Events",
            },
          ],
        },
        "Hotels",
        "Events",
      ],
      where: filter,
    });
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

    // DO NOT TURN ON! PREVENTS UPDATES TO EXISTING AREA NAMES IN OTHER TRIPS
    // If the email is being updated, check for duplicates
    // if (newArea.areaName && newArea.areaName !== existingArea.areaName) {
    //   const areaExists = await Area.findOne({
    //     where: { areaName: newArea.areaName },
    //   });
    //   if (areaExists) {
    //     return res.status(401).json({
    //       status: "fail",
    //       message: "area name already exists",
    //     });
    //   }
    // }

    // Update the area
    await existingArea.update({ ...newArea });
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
  console.log(areaId);
  try {
    const deletedArea = await Area.findByPk(areaId);
    await deletedArea.destroy();

    if (!deletedArea) {
      return res.status(404).send("area not found");
    }

    res.send(deletedArea);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};


// Empties all of the previous days from an area (before entering new ones) -- output => updated area
exports.removeDaysFromArea = async (req, res) => {
  const areaId = req.params.id;
  try {
    // Find the area by its ID and include the associated days
    const area = await Area.findByPk(areaId, {
      include: [{
        model: Day,
        through: { attributes: [] } // Exclude the join table attributes in the response
      }]
    });
    if (!area) {
      return res.status(404).send("Area not found");
    }
      // Check if the area has any days associated with it
      // DO NOT CHANGE THE STATUS FROM 200!
      if (area?.Days.length === 0) {
        return res.status(200).send({ message: "The area has no days associated with it." });
      }
    // Delete each day and remove its association with the area
    for (const day of area.Days) { // Access the included days through the association
      await day.destroy(); // This will also remove the association from the dayArea table
    }

    res.status(200).send({ message: "All days associated with the area have been deleted." });
 } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
 }
};
