const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Lottery = require('./Lottery');
const Prize = require('./Prize');

const Entry = sequelize.define('Entry', {
  entry_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { timestamps: false });

Entry.belongsTo(User, { foreignKey: 'user_id' });
Entry.belongsTo(Lottery, { foreignKey: 'lottery_id' });
Entry.belongsTo(Prize, { foreignKey: 'prize_id' });

module.exports = Entry;
