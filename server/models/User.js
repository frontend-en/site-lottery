const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  full_name: { type: DataTypes.STRING },
  card_token: { type: DataTypes.STRING },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false }, // Подтверждение email
  role: {
    type: DataTypes.ENUM('ADMIN', 'USER', 'MANAGER'),
    defaultValue: 'USER', // По умолчанию роль USER
    allowNull: false,
  },
  avatarUrl: { type: DataTypes.STRING, allowNull: true }, // Ссылка на аватар
  birthDate: { type: DataTypes.DATE, allowNull: true }, // Дата рождения
  discordId: { type: DataTypes.STRING, allowNull: true }, // Discord ID
  telegramId: { type: DataTypes.STRING, allowNull: true }, // Telegram ID
  discordNotify: { type: DataTypes.BOOLEAN, defaultValue: false }, // Уведомления в Discord
}, { timestamps: true });

module.exports = User;
