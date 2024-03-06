const sequelize = require('../server')
const { DataTypes } = require('sequelize')

const Trip = sequelize.define('Trip',{
    tripName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null
    },
  })

module.exports = Trip;
