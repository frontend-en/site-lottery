const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const authMiddleware = require('../middleware/authMiddleware'); // Подключаем middleware

// Регистрация пользователя (публичный маршрут)
router.post('/auth/register', authController.register);

// Подтверждение email (публичный маршрут)
router.get('/auth/confirm/:token', authController.confirmEmail);

// Логин пользователя (публичный маршрут)
router.post('/auth/login', authController.login);

// Пример защищённого маршрута
router.get('/auth/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Доступ открыт', user: req.user });
});

module.exports = router;
