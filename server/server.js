const express = require('express');
const morgan = require('morgan');
const sequelize = require('./db');
const userRouter = require('./routes/user.routes');
const lotteryRouter = require('./routes/lottery.routes');
const entryRoutes = require('./routes/entry.routes');
const prizeRoutes = require('./routes/prize.routes');
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

app.use('/api', userRouter);
app.use('/api', lotteryRouter);
app.use('/api', entryRoutes);
app.use('/api', prizeRoutes);

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