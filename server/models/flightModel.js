const sequelize = require('../server')
const { DataTypes } = require('sequelize')

const Flight = sequelize.define('Flight',{
    flightName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    }
  })

module.exports = Flight;
