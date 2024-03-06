const Day = require("../models/dayModel")
const Trip = require("../models/tripModel")
const Area = require("../models/areaModel");
const Event = require("../models/eventModel")
const Hotel = require("../models/hotelModel")
const Flight = require("../models/flightModel")
const { format } = require('date-fns')


Day.belongsToMany(Area, {
    through: "dayArea",
});
Area.belongsToMany(Day, {
    through: "dayArea",
});

Trip.hasMany(Day, {
    foreignKey: "tripId",
});
Day.belongsTo(Trip, {
    foreignKey: "tripId",
});

Day.belongsToMany(Event, {
    through: "dayEvent",
});
Event.belongsToMany(Day, {
    through: "dayEvent",
});

Day.belongsToMany(Flight, {
    through: "dayFlight",
});
Flight.belongsToMany(Day, {
    through: "dayFlight",
});

Hotel.belongsTo(Day, {
    foreignKey: "HotelId",
})
Day.belongsTo(Hotel, {
    foreignKey: "HotelId",
});

const addToDay = async (day, data) => {
    const area = await Area.findByPk(data.areaId)
    if (area && day.hasArea(data.areaId)) {
        await day.addArea(data.areaId);
    }
    const flight = await Flight.findByPk(data.flightId)
    if (flight && day.hasFlight(data.flightId)) {
        await day.addFlight(data.flightId);
    }
    if (data?.events) {
        for (const eventId of data.events) {
            const event = await Event.findByPk(eventId)
            if (event && day.hasEvent(eventId)) {
                await day.addEvent(eventId);
            }
        }
    }
}
const removeFromDay = async (day, data) => {
    const area = await Area.findByPk(data.areaId)
    if (area && day.hasArea(data.areaId)) {
        await day.removeArea(data.areaId);
    }
    const flight = await Flight.findByPk(data.flightId)
    if (flight && day.hasFlight(data.flightId)) {
        await day.removeFlight(data.flightId);
    }
    if (data?.events) {
        for (const eventId of data.events) {
            const event = await Event.findByPk(eventId)
            if (event && day.hasEvent(eventId)) {
                await day.removeEvent(eventId);
            }
        }
    }
}

// Create a new trip and add it to the database -- output => new trip
exports.registerDay = async (req, res) => {
    console.log("ddd");
    try {
        const currentTrip = await Trip.findOne({ where: { id: req.params.id } });
        if (!currentTrip) {
            return res.status(401).json({
                status: "fail",
                message: "trip not found",
            });
        }
        const [newDay, isCreated] = await Day.findOrCreate({
            where: {
                tripId: currentTrip.id, day: req.body?.day
            },
            defaults: {
                day: format(new Date(), "MM/dd/yyyy"),
                tripId: currentTrip.dataValues.id,
            }
        });
        if (isCreated) {
            await newDay.save()
        }
        req.body?.hotelId && await newDay.update({ hotelId: req.body.hotelId })
        await addToDay(newDay, req.body)
        await newDay.save()
        res.status(201).json({
            day: newDay,
        });
    } catch (err) {
        console.log(err);
        res.status(401).json({
            status: "fail",
            message: err,
        });
    }
};

exports.getDays = async (req, res) => {
    try {
        const filter = req.body
        const days = await Day.findAll({where:filter});
        res.send(days);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting the days");
    }
};

// Retrieve a day from the database -- output =>  day
exports.getDayById = async (req, res) => {
    const dayId = req.params.id;
    try {
        const day = await Day.findAll({
            include: [
                "Hotel",
                {
                    association: 'Flights',
                }, {
                    association: 'Areas',
                }, {
                    association: 'Events',
                }],
            where: { id: dayId },
        });

        if (!day) {
            return res.status(404).send("day not found");
        }

        res.send(day);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

//Updates a selected day -- output => updated day
exports.updateDay = async (req, res) => {
    const dayId = req.params.id;
    const newDay = req.body;
    try {
        const updatedDay = await Day.findByPk(dayId);

        if (!updatedDay) {
            return res.status(404).send("day not found");
        }

        // If the email is being updated, check for duplicates
        if (newDay.day) {
            return res.status(401).json({
                status: "fail",
                message: "cannot update the date",
            });
        }

        // Update the day
        req.body?.hotelId && await updatedDay.update({ hotelId: req.body.hotelId })
        await addToDay(updatedDay, req.body)
        await updatedDay.save();
        res.status(200).send(updatedDay);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

exports.removeValueDay = async (req, res) => {
    const dayId = req.params.id;
    const newDay = req.body;
    try {
        const updatedDay = await Day.findByPk(dayId);

        if (!updatedDay) {
            return res.status(404).send("day not found");
        }

        // If the email is being updated, check for duplicates
        if (newDay.day) {
            return res.status(401).json({
                status: "fail",
                message: "cannot update the date",
            });
        }

        // Update the day
        req.body?.hotelId && await updatedDay.update({ hotelId: req.body.hotelId })
        await removeFromDay(updatedDay, req.body)
        await updatedDay.save();
        res.status(200).send(updatedDay);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

//Deletes a selected day -- output => updated day
exports.deleteDay = async (req, res) => {
    const dayId = req.params.id;
    try {
        const deletedDay = await Day.findByPk(dayId);
        await deletedDay.destroy();

        if (!deletedDay) {
            return res.status(404).send("day not found");
        }

        res.send(deletedDay);
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

