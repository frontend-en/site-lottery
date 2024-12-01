const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Lottery = sequelize.define('Lottery', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  start_date: { type: DataTypes.DATE, allowNull: false },
  end_date: { type: DataTypes.DATE, allowNull: false },
}, { timestamps: true });

module.exports = Lottery;
