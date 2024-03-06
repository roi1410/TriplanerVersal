const sequelize = require('../server')
const { DataTypes } = require('sequelize')

const Hotel = sequelize.define('Hotel',{
    hotelName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },

  })

module.exports = Hotel;
