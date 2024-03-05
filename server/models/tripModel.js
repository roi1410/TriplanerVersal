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
      defaultValue:null
    },
    airport: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    startDate:{
      type: DataTypes.DATE,
      allowNull: true,
      trim: true,
      defaultValue:null
    },
    endDate:{
      type: DataTypes.DATE,
      allowNull: true,
      trim: true,
      defaultValue:null
    },
  })

module.exports = Trip;
