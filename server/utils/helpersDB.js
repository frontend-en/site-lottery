const sequelize = require("../db");

async function listTables() {
  try {
    // Выполните необработанный SQL-запрос для получения списка таблиц
    const [results, metadata] = await sequelize.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

    // Выведите названия таблиц
    console.log('Таблицы в базе данных:');
    results.forEach(row => console.log(row.table_name));
  } catch (error) {
    console.error('Ошибка при получении списка таблиц:', error);
  }
}

module.exports = { listTables };