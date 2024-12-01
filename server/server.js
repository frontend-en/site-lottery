const express = require('express');
const sequelize = require('./db');
const User = require('./models/User');
const Lottery = require('./models/Lottery');
const Prize = require('./models/Prize');
const Entry = require('./models/Entry');
const userRouter = require('./routs/user.routs')

const app = express();
app.use(express.json());
app.use('api', userRouter)

// // получить всех пользователей
// app.get('/allusers', async (_, res) => {
//   // res.send("Получены все пользователи")
//   try {
//     const allUsers = await User.findAll()
//     if (!allUsers.length) {
//       res.send('Пользователи ещё не зарегистрированны')
//     } else {
//       res.json(allUsers)
//     }

//   } catch (error) {
//     res.status(404).json({
//       error: error.message
//     })
//   }
// })
// // Создать нового пользователя
// app.post('/user', async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Получить список лотерей
// app.get('/lotteries', async (req, res) => {
//   try {
//     const lotteries = await Lottery.findAll();
//     res.json(lotteries);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Создать новую лотерею
// app.post('/lotteries', async (req, res) => {
//   try {
//     const lottery = await Lottery.create(req.body);
//     res.status(201).json(lottery);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Участвовать в лотерее
// app.post('/entries', async (req, res) => {
//   try {
//     const entry = await Entry.create(req.body);
//     res.status(201).json(entry);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// Синхронизация базы данных и запуск сервера
const PORT = 3000;

sequelize
  .sync({ force: true }) // Для разработки: пересоздаёт таблицы
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch((error) => console.error('Ошибка синхронизации базы данных:', error));
