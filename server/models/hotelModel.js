const sequelize = require('../server')
const { DataTypes } = require('sequelize')

const Hotel = sequelize.define('Hotel',{
    hotelName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    hotelInfo:{
      type:DataTypes.JSON,
      allowNull:true
    }
  })

module.exports = Hotel;
