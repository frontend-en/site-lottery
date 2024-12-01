const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  full_name: { type: DataTypes.STRING },
  card_token: { type: DataTypes.STRING },
}, { timestamps: true });

module.exports = User;
