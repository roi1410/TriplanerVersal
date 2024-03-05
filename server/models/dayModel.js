const sequelize = require('../server')
const { DataTypes } = require('sequelize')

const Day = sequelize.define('Day',{
    day: {
      type: DataTypes.DATE,
      allowNull: false,
      default: new Date
    }
  })

module.exports = Day;
