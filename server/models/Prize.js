const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Lottery = require('./Lottery');

const Prize = sequelize.define('Prize', {
  prize_name: { type: DataTypes.STRING, allowNull: false },
  promo_code: { type: DataTypes.STRING },
  is_guaranteed: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

Prize.belongsTo(Lottery, { foreignKey: 'lottery_id' });

module.exports = Prize;
