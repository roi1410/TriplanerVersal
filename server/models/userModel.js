const sequelize = require('../server')
const { DataTypes } = require('sequelize')

const User = sequelize.define('User',{
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    role: {
      type: DataTypes.ENUM(['admin', 'client']),
      allowNull: false,
      defaultValue: "client",
    },
  })

module.exports = User;
