const sequelize = require('../server')
const { DataTypes } = require('sequelize')
const { format } = require( 'date-fns')

const Day = sequelize.define('Day',{
    day: {
      type: DataTypes.DATE,
      allowNull: false,
      default: format(new Date(),"dd/mm/yyyy")
    }
  })

module.exports = Day;
