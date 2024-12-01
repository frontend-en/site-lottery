const express = require('express');
const morgan = require('morgan');
const sequelize = require('./db');
const userRouter = require('./routs/user.routes');
const lotteryRouter = require('./routs/lottery.routes');
const logger = require('./utils/logger');
const { listTables } = require('./utils/helpersDB');

const app = express();
app.use(express.json());
// Настройка Morgan для использования Winston
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));
// Обработка ошибок
app.use((err, req, res, next) => {
  logger.error('Ошибка: %o', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.use('/api', userRouter); // Добавлен слэш перед 'api'

app.use('/api', lotteryRouter); // Добавлен слэш перед 'api/lottery'
app.use((req, res, next) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

// Вызов функции для отображения таблиц
listTables();

// Синхронизация базы данных и запуск сервера
const PORT = process.env.PORT || 3000; // Использование переменной окружения для порта

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch((error) => console.error('Ошибка синхронизации базы данных:', error));

// app.listen(PORT, () => console.log('listening on port'))