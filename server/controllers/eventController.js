const Area = require("../models/areaModel");
const Event = require("../models/eventModel")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

Area.hasMany(Event, {
    foreignKey: "areaId",
  });
Event.belongsTo(Area, {
    foreignKey: "areaId",
  });

// Create a new area and add it to the database -- output => new area
exports.registerEvent = async (req, res) => {
  try {
    const currentArea = await Area.findOne({where: { id: req.params.id }});
    const eventExists = await Event.findOne({where: { areaId: currentArea.id ,eventName: req.body.eventName }});
    if (eventExists) {
      return res.status(400).json({
        status: "fail",
        mesage: "Area already exists",
      });
    }

    const newEvent = await Event.create({...req.body,
        areaId: currentArea.dataValues.id,
      });

    res.status(201).json({
      event: newEvent,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const filter = req.body
    const events = await Event.findAll({where:filter});
    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting the events");
  }
};

// Retrieve a event from the database -- output =>  event
exports.getEventById = async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).send("event not found");
    }

    res.send(event);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//Updates a selected event -- output => updated event
exports.updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const newEvent = req.body;
  try {
    const existingEvent = await Event.findByPk(eventId);

    if (!existingEvent) {
      return res.status(404).send("event not found");
    }

    // If the email is being updated, check for duplicates
    if (newEvent.eventName && newEvent.eventName !== existingEvent.eventName) {
      const eventExists = await Event.findOne({where: { eventName: newEvent.eventName }});
      if (eventExists) {
        return res.status(401).json({
          status: "fail",
          message: "event name already exists",
        });
      }
    }

    // Update the event
    await existingEvent.update({ ...newEvent })
    await existingEvent.save();
    res.status(200).send(existingEvent);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//Deletes a selected event -- output => updated event
exports.deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  try {
    const deletedEvent = await Event.findByPk(eventId);
    await deletedEvent.destroy();

    if (!deletedEvent) {
      return res.status(404).send("event not found");
    }

    res.send(deletedEvent);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

