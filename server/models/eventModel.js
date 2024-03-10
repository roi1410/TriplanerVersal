const sequelize = require('../server')
const { DataTypes } = require('sequelize')

const Event = sequelize.define('Event',{
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    eventInfo:{
      type:DataTypes.JSON
      ,allowNull:true
    }
    
  })

module.exports = Event;
