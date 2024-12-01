const { Sequelize } = require('sequelize');

// Настройки подключения к базе данных
const sequelize = new Sequelize('loki', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Выключить логи SQL-запросов
  port: 5432
});

// Проверка подключения
sequelize
  .authenticate()
  .then(() => console.log('Подключение к базе данных установлено.'))
  .catch((err) => console.error('Ошибка подключения к базе данных:', err));

module.exports = sequelize;
